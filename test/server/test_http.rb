# coding: utf-8

require 'sinatra'
require 'sinatra/cross_origin'

register Sinatra::CrossOrigin
disable :protection

get '/' do
  cross_origin
  "hello, world"
end

post '/' do
  cross_origin
  params[:message]
end
