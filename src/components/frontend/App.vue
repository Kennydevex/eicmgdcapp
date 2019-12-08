<template>
  <v-app>
    <v-navigation-drawer v-model="mobile_front_menu" app disable-resize-watcher>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Início</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name: 'teste'}">
          <v-list-item-action>
            <v-icon>mdi-account-tie</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Menu1</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="toggle_mobile_front_menu"></v-app-bar-nav-icon>
      <v-img
        class="mx-2"
        :src="require('../../assets/logo.png')"
        max-height="40"
        max-width="40"
        contain
      ></v-img>

      <v-toolbar-title class="headline text-uppercase">
        <span>EICM-</span>
        <span class="font-weight-light">GDC</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/" class="pa-2" text color="primary">
          <span class="font-weight-regular">Início</span>
        </v-btn>

        <template v-for="menu in menus">
          <v-btn
            :key="menu.id"
            text
            :to="{name: 'login_page'}"
            v-if="!menu.submenus"
            @click="menuLink(menu.name, '')"
          >
            <span class="font-weight-regular">{{menu.title}}</span>
          </v-btn>

          <v-menu
            :key="menu.id"
            :nudge-width="100"
            v-else
            offset-y
            transition="slide-x-transition"
            bottom
            right
          >
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on" color="primary">
                <span class="font-weight-regular">{{menu.title}}</span>
                <v-icon dark>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="submenu in menu.submenus"
                :key="submenu.id"
                @click="menuLink(submenu.name, submenu.slug)"
              >
                <v-list-item-title class="font-weight-regular" dark>{{submenu.title}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-toolbar-items>

      <template v-if="!authUser">
        <v-btn color="primary" icon :to="{name: 'login_page'}">
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </template>

      <template v-else>
        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" text color="primary">
              <v-avatar size="28px">
                <img :src="require('../../assets/logo.png')" alt="Avatar" />
              </v-avatar>
            </v-btn>
          </template>

          <v-list shaped>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="!item.href ? { name: item.name } : null"
                :href="item.href"
                @click="item.click"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <app-footer></app-footer>
  </v-app>
</template>

<script>
import menus from "@/datas/static/menu_frontend";

import AppFooter from "./partials/AppFooter";

export default {
  name: "App",

  data() {
    return {
      mobile_front_menu: false,
      menus: menus,
      items: [
        {
          icon: "mdi-account-card-details",
          href: "#",
          title: "Meu Perfil",
          click: e => {
            this.$router.push({
              name: "app-perfil",
              params: { username: this.authUser.username }
            });
          }
        },
        {
          icon: "mdi-view-dashboard-variant",
          href: "#",
          title: "Dashboard",
          permission: "acess admin panel",
          click: e => {
            this.$router.push({ name: "admin_page" });
          }
        },
        {
          icon: "mdi-logout",
          href: "#",
          title: "Terminar Sessão",
          click: e => {
            this.logout();
          }
        }
      ]
    };
  },

  methods: {
    toggle_mobile_front_menu() {
      this.mobile_front_menu = !this.mobile_front_menu;
    },

    menuLink: function(menu, param) {
      this.$router.push({ name: menu, params: { param } });
    },

    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/");
    }
  },

  components: {
    AppFooter
  }
};
</script>
