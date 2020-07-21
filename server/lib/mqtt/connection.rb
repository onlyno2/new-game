require 'rubygems'
require 'mqtt'
require 'singleton'

module Mqtt
  class Connection
    include Singleton

    def initialize
      @client = MQTT::Client.connect(
        :host => ENV['MQTT_HOST'],
        :port => ENV['MQTT_PORT']
      )
      @client.get_packet('#') do |packet|
        p packet # TODO handle incomming message
      end
    end

    def disconnect
      @client.disconnect()
    end

    def publish(topic, payload, retain = false)
      @client.publish(topic, payload, retain = false)
    end

    def subscribe(topic)
      @client.subscribe(topic)
    end
  end
end
