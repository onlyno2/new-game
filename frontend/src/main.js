import Vue from 'vue';
import App from './App.vue';
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
var mqtt = require('mqtt');

var settings = {
  mqttServerUrl: '10.0.33.39',
  port: 9001
}

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];
var client = mqtt.connect('mqtt://' + settings.mqttServerUrl + ":" + settings.port, { clientId: 'web' });
Vue.prototype.$mqtt = client;

defineIonPhaser(window);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
