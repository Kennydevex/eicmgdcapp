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

    <v-app-bar app class="elevation-2">
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="toggle_mobile_front_menu"></v-app-bar-nav-icon>
      <v-img
        class="mx-2"
        :src="require('@/assets/logo.png')"
        max-height="40"
        max-width="40"
        contain
      ></v-img>

      <v-toolbar-title class="text-uppercase primary--text">
        <span class="font-weight-light">EICM-</span>
        <span class="font-weight-thin">GDC</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn :ripple="false" to="/" class="pa-2 mybtn" text color>
          <span class="font-weight-light">Início</span>
        </v-btn>

        <template v-for="menu in menus">
          <v-btn
          :ripple="false"
            class="mybtn"
            color
            :key="'menu1'+menu.id"
            text
            :to="{name: 'login_page'}"
            v-if="!menu.submenus"
            @click="menuLink(menu.name, '')"
          >
            <span class="font-weight-light">{{menu.title}}</span>
          </v-btn>

          <v-menu
            :key="'menu2'+menu.id"
            :nudge-width="100"
            v-else
            offset-y
            transition="slide-x-transition"
            bottom
            right
          >
            <template v-slot:activator="{ on }">
              <v-btn :ripple="false" class="mybtn" text v-on="on" color>
                <span class="font-weight-light">{{menu.title}}</span>
                <v-icon dark>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
              :ripple="false"
                v-for="submenu in menu.submenus"
                :key="submenu.id"
                @click="menuLink(submenu.name, submenu.slug)"
                class="submenuitem"
              >
                <v-list-item-title class="font-weight-light" dark>{{submenu.title}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-toolbar-items>

      <template v-if="!authUser">
        <v-btn :ripple="false" small color icon :to="{name: 'login_page'}">
          <v-icon small>mdi-login-variant</v-icon>
        </v-btn>
      </template>

      <template v-else>
        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn :ripple="false" icon v-on="on" text color>
              <v-avatar size="28px">
                <img :src="require('../../assets/logo.png')" alt="Avatar" />
              </v-avatar>
            </v-btn>
          </template>

          <v-list shaped>
            <v-list-item-group color>
              <v-list-item
                v-for="(dropmenu, i) in dropmenus"
                :key="'dropmenu'+i"
                :to="!dropmenu.href ? { name: dropmenu.name } : null"
                :href="dropmenu.href"
                @click="dropmenu.click"
                :ripple="false"
                class="submenuitem"
              >
                <v-list-item-icon>
                  <v-icon v-text="dropmenu.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="dropmenu.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-content class="white">
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
      dropmenus: [
        {
          icon: "mdi-account-card-details",
          href: "#",
          title: "Meu Perfil",
          //eslint-disable-next-line
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
          //eslint-disable-next-line
          click: e => {
            this.$router.push({ name: "admin_page" });
          }
        },
        {
          icon: "mdi-logout",
          href: "#",
          title: "Terminar Sessão",
          //eslint-disable-next-line
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

    menuLink: function(menu, slug) {
      this.$router.push({ name: menu, params: { slug } });
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

<style lang="scss" scoped>

// Ponto a melhorar, pois os conteudos do botao nao podem se mecher durante a navegacao
.mybtn:hover, .submenuitem:hover {
  border-left: 2px #2698d9 solid;
}

</style>
