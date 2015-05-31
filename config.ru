require_relative 'app/controller'
use Rack::Reloader
use Rack::Static, :urls => ['/css', '/js'], :root => 'public'
run Controller.new