<template>
  <div class="hello">
    <div @click="initializeGame" class="flex">
      <a href="#1" class="btn">Initialize</a>
    </div>
    <ion-phaser v-bind:game.prop="game" v-bind:initialize.prop="initialize" />
  </div>
</template>

<script>
import Phaser from 'phaser';
var mqtt = require('mqtt');

var settings = {
  mqttServerUrl: '10.0.33.39',
  port: 9001
}
var client = mqtt.connect('mqtt://' + settings.mqttServerUrl + ":" + settings.port, { clientId: 'web' });

export default {
  data() {
    return {
      initialize: false,
      game: {
        width: '100%',
        height: '100%',
        type: Phaser.AUTO,
        physics: {
          default: 'arcade',
          arcade: {
            debug: false
          },
        },
        scene: {
          preload () {
              this.load.image('ship', '../assets/ship.png');
          },
          init() {
            this.cameras.main.setBackgroundColor('#24252A');
          },
          create() {
            let group = this.physics.add.group({
                angularVelocity: 60,
                bounceX: 1,
                bounceY: 1,
                collideWorldBounds: true,
                dragX: 60,
                dragY: 60
            });
            let ship = group.create(100, 200, 'ship');
            client.subscribe('data/test');
            client.on('message', (topic, message) => {
              let data = JSON.parse(String.fromCharCode.apply(String, message));
              console.log(data, data.x, data.y);
              ship.setVelocity(data.x * 30, data.y * 30);
            });
          },
          update: () => {
          },
        },
      },
    };
  },
  created() {
  },
  methods: {
    initializeGame() {
      this.initialize = true;
    }
  },
};
</script>
