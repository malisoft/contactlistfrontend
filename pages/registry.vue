<template>
<v-app>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Create your account</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="name" name="name" prepend-icon="mdi-account" type="text" v-model="account.name"></v-text-field>
                            <v-text-field label="Email" name="email" prepend-icon="mdi-account" type="email" v-model="account.email"></v-text-field>
                            <v-text-field id="password" label="Password" name="password" prepend-icon="mdi-lock" type="password" v-model="account.password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <small class="mx-2 red--text">{{message}}</small>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">Create</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>

<script>
export default {
    layout: 'blank',
    data() {
        return {
            account: {
                name: '',
                email: '',
                password: '',
            },
            message: null,
            loading: false,
        }
    },
    methods: {
        login() {
            //we make the login with the api and redirect if it's true to home page /
            this.loading = true;
            this.message = null;
            this.$axios
                .post('/user/create', this.account)
                .then((response) => {
                    return response.data;
                })
                .then((data) => {
                    let {
                        authToken,
                        userResult
                    } = data;
                    this.$router.push('/login');
                    this.loading = false;
                })
                .catch((error) => {
                    this.loading = false;
                    this.message = error.response ? error.response.data.message : 'Ocurrio un error.';
                });
        },
    },
};
</script>
