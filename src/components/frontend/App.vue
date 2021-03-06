<template>
  <v-app>
    <v-navigation-drawer width="320" app v-model="mobile_front_menu" disable-resize-watcher>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="require('@/assets/logos/tiny_logo.svg')"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title primary--text">
            EICM -
            <span class="font-weight-light">GDC</span>
          </v-list-item-title>
          <v-list-item-subtitle>Escola Industrial e Comercial do Mindelo</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item color="primary" @click="menuLink('home_page', '')">
          <v-list-item-icon>
            <v-icon>mdi-home-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Principal</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-for="(item, i) in menus">
          <v-list-group
            :prepend-icon="item.icon"
            no-action="no-action"
            v-if="item.submenus"
            :key="i+'front_drawer_'+i"
          >
            <v-list-item color="primary" slot="activator" class="pl-0">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <template v-for="(sub_menu, i) in item.submenus">
              <v-list-item
                color="primary"
                :key="'front_sub_menu'+i"
                @click="menuLink(sub_menu.name, sub_menu.slug)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <span>{{ sub_menu.title }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>

          <v-list-item
            color="primary"
            :key="i+'s_front_drawer_'+i"
            v-else
            @click="menuLink(item.name, item.slug)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            color="primary"
            tile
            small
            v-if="!authUser"
            @click="menuLink('login_page', '')"
            block
          >Entrar</v-btn>
          <v-btn color="primary" tile small v-else @click="logout()" block>Terminar Sessão</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app class="elevation-1" color="white">
      <v-app-bar-nav-icon
        color="primary"
        class="hidden-md-and-up"
        @click.stop="toggle_mobile_front_menu"
      ></v-app-bar-nav-icon>

      <img
        class="hidden-sm-and-down"
        :src="require('@/assets/logos/tiny_logo.svg')"
        width="60"
        alt="EICM GDC"
      />
      <v-toolbar-title class="text-uppercase primary--text">
        <div class="pt-6 hidden-sm-and-down">
          <span class="font-weight-regular">EICM-</span>
          <span class="font-weight-thin">GDC</span>
        </div>
        <div class="hidden-md-and-up">
          <span class="font-weight-regular">EICM-</span>
          <span class="font-weight-thin">GDC</span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn :ripple="false" :to="{name: 'home_page'}" class="mybtn" text color="primary">
          <span class="font-weight-regular">Principal</span>
        </v-btn>

        <template v-for="menu in menus">
          <v-btn
            color="primary"
            active-class
            :ripple="false"
            class="mybtn font-weight-regular"
            :key="'menu1'+menu.id"
            text
            v-if="!menu.submenus"
            @click="menuLink(menu.name, '')"
          >{{menu.title}}</v-btn>

          <v-menu
            v-else
            tile
            :key="'menu2'+menu.id"
            :max-width="500"
            :min-width="300"
            offset-y
            transition="slide-x-transition"
            bottom
            right
          >
            <template v-slot:activator="{ on }">
              <v-btn
                active-class
                :ripple="false"
                class="mybtn font-weight-regular"
                text
                v-on="on"
                color="primary"
              >
                {{menu.title}}
                <v-icon dark>mdi-circle-small</v-icon>
              </v-btn>
            </template>
            <v-list class="pa-0">
              <v-list-item
                color="primary"
                :ripple="false"
                v-for="submenu in menu.submenus"
                :key="submenu.id"
                @click="menuLink(submenu.name, submenu.slug)"
                class="submenuitem"
              >
                <v-list-item-title class="font-weight-regular" dark>{{submenu.title}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-toolbar-items>

      <template v-if="!authUser">
        <v-btn :ripple="false" small color="primary" icon :to="{name: 'login_page'}">
          <v-icon small>mdi-login-variant</v-icon>
        </v-btn>
      </template>

      <template v-else>
        <v-menu left bottom :rounded="false">
          <template v-slot:activator="{ on }">
            <v-btn active-class :ripple="false" icon v-on="on" text color="primary">
              <v-avatar size="32" color="grey lighten-2">
                <v-img :src="`${apiUrl}/images/app/system/users/${authUser.avatar}`"></v-img>
              </v-avatar>
            </v-btn>
          </template>

          <v-list dense class="pa-0">
            <v-list-item-group color="primary">
              <v-list-item @click.stop="onView('front_perfil', authUser.username)" :ripple="false">
                <v-list-item-icon>
                  <v-icon>mdi-at</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="authUser.username"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click.stop="onView('admin_page')" :ripple="false">
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Admin</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click.stop="logout()" :ripple="false">
                <v-list-item-icon>
                  <v-icon>mdi-logout-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Terminr Sessão</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-main class="white" height="auto">
      <router-view></router-view>
    </v-main>
    <div>
      <app-footer></app-footer>
    </div>
  </v-app>
</template>

<script>
import menus from "@/datas/static/menu_frontend";
import { getDatas } from "@/mixins/SendForm";
import { viewAndUpdate } from "@/mixins/Redirects";

import AppFooter from "./partials/AppFooter";

export default {
  name: "app_front",

  mixins: [getDatas, viewAndUpdate],

  data() {
    return {
      mobile_front_menu: false,
      menus: menus
    };
  },

  methods: {
    toggle_mobile_front_menu() {
      this.mobile_front_menu = !this.mobile_front_menu;
    },

    menuLink: function(menu, slug) {
      if (this.$router.history.current.name == menu) {
        return;
      }
      this.$router.push({ name: menu, params: { slug } });
    },

    logout: function() {
      this.$store.commit("logout");
      this.onView('home_page')
    }
  },

  components: {
    AppFooter
  }
};
</script>

<style lang="scss" scoped>
// Ponto a melhorar, pois os conteudos do botao nao podem se mecher durante a navegacao

.mybtn,
.submenuitem {
  border-bottom: 2px transparent solid;
  border-top: 2px transparent solid;
  // padding-bottom: 2px;
  transition: border-bottom 0.5s;
}
.mybtn:hover,
.submenuitem:hover {
  // padding-bottom: 0px;
  border-bottom: 2px rgb(62, 64, 149) solid;
}

.v-btn:before {
  background-color: transparent;
}

.v-btn:hover:before {
  background-color: transparent;
}

li {
  padding: 5px;
}
a {
  text-decoration: none;
  transition: color 0.6s;
  color: aliceblue;
}
a:hover {
  color: white;
}
</style>
