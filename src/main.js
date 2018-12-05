import Vue from "vue";

Vue.config.productionTip = false;

import Vuetify from "vuetify";

Vue.use(Vuetify);
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import Home from "./pages/Home.vue";
import SignUp from "./pages/SignUp.vue";
import About from "./pages/About.vue";
import Accounts from "./pages/Accounts.vue";
import Reset from "./pages/ResetPassword.vue";
import Activities from "./pages/Activities.vue";
import CoreHours from "./pages/CoreHours.vue";
import Schedule from "./pages/Schedule.vue";
import Teams from "./pages/Teams.vue";
import Commitments from "./pages/Commitments.vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes: [
        {name: "home-page", path: "/", component: Home},
        {name: "sign-up", path: "/sign-up", component: SignUp},
        {name: "about-us", path: "/about-us", component: About},
        {name: "accounts", path: "/accounts", component: Accounts},
        {name: "reset-password", path: "/reset-password", component: Reset},
        {name: "activities", path: "/activities", component: Activities},
        {name: "core-hours", path: "/core-hours", component: CoreHours},
        {name: "schedule", path: "/schedule", component: Schedule},
        {name: "teams", path: "/teams", component: Teams},
        {name: "commitments", path: "/commitments", component: Commitments}

    ]
});

import App from "./App.vue";

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});
