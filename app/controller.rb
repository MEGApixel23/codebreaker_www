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
      when '/'
        render 'index'
      when '/input_code'
        @game.input_code = request.params['code']
        render_json @game.check_code
      when '/hint'
        render_json @game.hint
      when '/save_results'
        test = @game.save_result request.params['name']
        p test
        p request.params['name']
        render_raw(test)
      when '/start_again'
        start_game true
        render_json(true)
      else
        Rack::Response.new('Not Found', 404)
    end
  end

  def start_game(restart=false)
    if restart || !@game
      @game = Codebreaker::Game.new
      @game.start
      @game.instance_variable_set('@code', '1234')
      @game.instance_variable_set('@scores_file', File.expand_path('../scores.json', __FILE__));
    end

    @game
  end

  def render_json(data)
    Rack::Response.new(data.to_json, 200, {'Content-Type' => 'application/json'})
  end

  def render_raw(data)
    p data
    Rack::Response.new(data.to_json, 200, {'Content-Type' => 'application/json'})
  end

  def render(template)
    path = File.expand_path("../templates/#{template}.html.erb", __FILE__)
    result = ERB.new(File.read(path)).result(binding)

    Rack::Response.new(result)
  end
end