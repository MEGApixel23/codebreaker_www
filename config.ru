require_relative 'app/controller'
use Rack::Reloader
run Controller.new