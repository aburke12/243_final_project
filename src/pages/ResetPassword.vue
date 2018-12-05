<template>
    <div>
        <h4 class="display-1">Reset Password</h4>

        <instructions details="Reset password for our nifty site." />

        <v-form v-model="valid">
            <v-text-field
                v-model="email"
                v-bind:rules="rules.email"
                error-count="10"
                type="email"
                label="Your email address"
            >
            </v-text-field>
            <v-text-field
                v-model="oldPassword"
                v-bind:rules="rules.oldPassword"
                error-count="10"
                type="oldPassword"
                label="Old password"
                required
            >
            </v-text-field>
            <v-text-field
                v-model="newPassword"
                v-bind:rules="rules.newPassword"
                error-count="10"
                type="newPassword"
                label="New password"
                required
            >
            </v-text-field>
            <v-text-field
                v-model="newPassword2"
                v-bind:rules="rules.newPassword2"
                error-count="10"
                type="newPassword2"
                label="Confirm new password"
                required
            >
            </v-text-field>
            <v-btn v-bind:disabled="!valid" v-on:click="handleSubmit"
                >Reset Password
            </v-btn>
        </v-form>

        <div class="text-xs-center">
            <v-dialog v-model="dialogVisible" width="500">
                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                        {{ dialogHeader }}
                    </v-card-title>

                    <v-card-text> {{ dialogText }} </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat v-on:click="hideDialog"
                            >Okay</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import Instructions from "../components/Instructions.vue";
import axios from "axios";

export default {
    name: "ResetPasswordPage",
    components: {
        Instructions
    },
    data: function() {
        return {
            valid: false,
            email: "",
            oldPassword: "",
            newPassword: "",
            newPassword2: "",

            dialogHeader: "<no dialogHeader>",
            dialogText: "<no dialogText>",
            dialogVisible: false,

            rules: {
                required: [
                    val => val.length > 0 || 'Required'
                ],
                email: [
                    val => /^\w+@\w+\.\w{2,}$/.test(val) || "Invalid e-mail"
                ],
                oldPassword: [
                    val => /[A-Z]/.test(val) || "Need upper case letter",
                    val => /[a-z]/.test(val) || "Need lower case letter",
                    val => /\d/.test(val) || "Need digit",
                    val => val.length >= 8 || "Minimum 8 characters"
                ],
                newPassword: [
                    val => /[A-Z]/.test(val) || "Need upper case letter",
                    val => /[a-z]/.test(val) || "Need lower case letter",
                    val => /\d/.test(val) || "Need digit",
                    val => val.length >= 8 || "Minimum 8 characters"
                ],
                newPassword2: [
                    val => /[A-Z]/.test(val) || "Need upper case letter",
                    val => /[a-z]/.test(val) || "Need lower case letter",
                    val => /\d/.test(val) || "Need digit",
                    val => val.length >= 8 || "Minimum 8 characters"
                ]
            }
        };
    },
    methods: {
        handleSubmit: function() {
            axios
                .post("/api/reset-password", {
                    email: this.email,
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword,
                    newPassword2: this.newPassword2,

                })
                .then(result => {
                    if (result.status === 200) {
                        if (result.data.ok) {
                            this.showDialog("Success", result.data.msge);
                        } else {
                            this.showDialog("Sorry", result.data.msge);
                        }
                    }
                })
                .catch(err => this.showDialog("Failed", err));
        },
        showDialog: function(header, text) {
            this.dialogHeader = header;
            this.dialogText = text;
            this.dialogVisible = true;
        },
        hideDialog: function() {
            this.dialogVisible = false;
            this.$router.push({ name: "home-page" });
        }
    }
};
</script>
