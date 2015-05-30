require 'codebreaker'
require 'irb'
require 'json'

class Controller
  def call(env)
    start_game
    route Rack::Request.new(env)
  end

  def route(request)
    case request.path
      when '/input_code'
        @game.input_code = request.params['code']
        render_json @game.check_code
      when '/hint'
        render_json @game.hint
      when '/save_results'
        render_json(@game.save_result request.params['name'])
      else
        Rack::Response.new('Not Found', 404)
    end
  end

  def start_game
    unless @game
      @game ||= Codebreaker::Game.new
      @game.start
    end

    @game
  end

  def render_json(data)
    Rack::Response.new(data.to_json, 200, {'Content-Type' => 'application/json'})
  end

  def render(template)
    path = File.expand_path("../templates/#{template}.html.erb", __FILE__)
    result = ERB.new(File.read(path)).result(binding)

    Rack::Response.new(result)
  end
end