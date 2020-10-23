<template>
<v-app>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Email" name="login" prepend-icon="mdi-account" type="text" v-model="account.email"></v-text-field>

                            <v-text-field id="password" label="Password" name="password" prepend-icon="mdi-lock" type="password" v-model="account.password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <small class="mx-2 red--text">{{message}}</small>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <small class="mr-2 blue--text" @click="forgotPassword">I forgot my Password</small>
                        <v-btn color="secondary" to="registry">Register</v-btn>
                        <v-btn color="primary" @click="login">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Restore your password</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field label="Email" v-model="emailRestore" type="email" name="email" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small class="red--text">{{message}}</small>
                </v-card-text>
                <v-card-text v-show="ticket">
                    <h2>Message</h2>
                    {{messageTicket}}
                    <h2>This url is for a test email</h2>
                    {{urlTicket}}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn :loading="sending" color="blue darken-1" text @click="sendEmailRestore">
                        Send
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</v-app>
</template>

<script>
export default {
    layout: 'blank',
    async asyncData({
        store,
        redirect
    }) {
        let result = store.getters.isToken;
        console.log("No hay session de este cliente");
        let account = {
            email: '',
            password: '',
        };
        let emailRestore = '';
        let dialog = false;
        let sending = false;
        let ticket = false;
        let message = null;

        let messageTicket = '';
        let urlTicket = '';
        return !result ? {
            account,
            emailRestore,
            dialog,
            message,
            sending,
            ticket,
            messageTicket,
            urlTicket,
        } : redirect("/");
    },
    methods: {
        forgotPassword() {
            this.dialog = true;
        },
        sendEmailRestore() {
            if (!this.ticket) {
                this.sending = true;
                this.$axios
                    .post('/ticket/create', {
                        email: this.emailRestore
                    })
                    .then((response) => {
                        return response.data;
                    })
                    .then((data) => {
                        this.ticket = true;
                        this.messageTicket = data.message;
                        this.urlTicket = data.url;
                        this.sending = false;
                    })
                    .catch((error) => {
                        this.message = error.response ? error.response.data.message : 'Ocurrio un error.';
                        this.sending = false;
                    });
            }

        },
        login() {
            //we make the login with the api and redirect if it's true to home page /
            this.message = null;
            this.$axios
                .post('/user/login', this.account)
                .then((response) => {
                    return response.data;
                })
                .then((data) => {
                    let {
                        authToken,
                        userResult
                    } = data;
                    this.$store.dispatch('guardarToken', authToken);
                    this.$store.dispatch('guardarUser', userResult);
                    this.$router.push('/');
                })
                .catch((error) => {
                    this.message = error.response ? error.response.data.message : 'Ocurrio un error.';
                });
        },
    },
};
</script>
