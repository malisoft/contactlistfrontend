<template>
<v-app dark>
    <v-navigation-drawer v-model="drawer" app right>
        <v-list dense>
            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-email</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>Contact</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="cyan" dark>
        Bienvenido {{$store.getters.getUser.name}}
        <v-spacer></v-spacer>

        <v-toolbar-title>Contact List System</v-toolbar-title>

        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
        <v-container>
            <nuxt />
        </v-container>
    </v-main>
    <v-footer color="cyan" app>
        <v-spacer></v-spacer>

        <span class="white--text">Malisoft &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
</v-app>
</template>

<script>
export default {
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [{
                    icon: 'mdi-apps',
                    title: 'Welcome',
                    to: '/'
                },
                {
                    icon: 'mdi-chart-bubble',
                    title: 'Usuario',
                    to: '/inspire'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js'
        }
    }
}
</script>
