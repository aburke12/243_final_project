<template>
    <v-toolbar dark color="primary">
        <v-toolbar-side-icon></v-toolbar-side-icon>

        <router-link v-bind:to="{ name: 'home-page' }">
            <v-toolbar-title class="white--text">
                Rendezvous
            </v-toolbar-title>
        </router-link>

        <v-spacer></v-spacer>

        <v-btn flat v-bind:to="{ name: 'sign-up' }">Sign Up</v-btn>

        <v-btn flat v-bind:to="{ name: 'about-us' }">About Us</v-btn>

        <v-btn flat v-bind:to="{ name: 'reset-password' }">Reset Password</v-btn>

	<v-btn flat v-bind:to="{ name: 'activities' }">Activities</v-btn>
        
	<v-btn flat v-bind:to="{ name: 'schedule' }">Schedule</v-btn>
	
	<v-menu offset-y>
            <v-btn flat slot="activator">
                <span>Account Info</span>
                <v-icon dark>arrow_drop_down</v-icon>
            </v-btn>

            <v-list>
                <v-list-tile v-bind:to="{ name: 'accounts' }">
                    <v-list-tile-title>Accounts</v-list-tile-title>
                </v-list-tile>
                <v-list-tile v-bind:to="{ name: 'teams' }">
                    <v-list-tile-title>Teams</v-list-tile-title>
                </v-list-tile>
                <v-list-tile v-bind:to="{ name: 'core-hours' }">
                    <v-list-tile-title>Core Hours</v-list-tile-title>
                </v-list-tile>
                <v-list-tile v-bind:to="{ name: 'commitments' }">
                    <v-list-tile-title>Commitments</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>
