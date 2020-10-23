<template>
<v-card>
    <v-card-title>
        <span class="headline">Ticket -> {{ticketId}}</span>
    </v-card-title>
    <v-card-text>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Email" v-model="password" type="password" name="password" required></v-text-field>
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
</template>

<script>
export default {
    async asyncData({
        params,
    }) {
        let ticketId = params.id;
        return {
            ticketId,
        }
    },
    created() {
        console.log("The new Item is:");
        console.log(this.item)
    },
};
</script>
