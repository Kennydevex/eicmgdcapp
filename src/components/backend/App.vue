<template>
  <v-app>
    <!-- <v-navigation-drawer
      :dark="dark"
      app
      hide-overlay
      clipped
      v-model="back_menu_drawer"
      :mini-variant.sync="backend_mini_drawer"
      stateless
    >-->
    <v-navigation-drawer
      :dark="dark"
      app
      hide-overlay
      v-model="back_menu_drawer"
      :mini-variant.sync="backend_mini_drawer"
    >
      <v-list-item class="pb-2">
        <v-list-item-avatar>
          <v-img :src="require('@/assets/placeholder/default.svg')"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>Estefanio Silva</v-list-item-title>
        <!-- <v-list-item-title class="primary--text">Estefanio Silva</v-list-item-title> -->
        <v-btn icon @click.stop="backend_mini_drawer = !backend_mini_drawer">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <template v-for="(item, i) in menus">
          <v-list-group
            v-if="item.items"
            :key="item.name"
            :group="item.group"
            :prepend-icon="item.icon"
            no-action="no-action"
            :disabled="!(_is(item.role))"
          >
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <template v-for="(subItem, i) in item.items">
              <v-list-item
                :key="i"
                :to="genChildTarget(item, subItem)"
                :href="subItem.href"
                :disabled="subItem.disabled"
                :target="subItem.target"
                v-if="_can(subItem.permission)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <span>{{ subItem.title }}</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action v-if="subItem.action">
                  <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                </v-list-item-action>
                <!-- <v-icon>mdi-home</v-icon> -->
                <v-icon v-text="subItem.icon"></v-icon>
              </v-list-item>
            </template>
          </v-list-group>

          <v-subheader
            :style=" backend_mini_drawer ?'display: none': ''"
            v-else-if="item.header"
            :key="i"
          >{{ item.header }}</v-subheader>

          <v-divider v-else-if="item.divider" :key="i"></v-divider>

          <!--top-level link-->
          <v-list-item
            v-else
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="item.name"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action v-if="item.subAction">
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- =============================================== -->

    <!-- <v-app-bar app clipped-left fixed elevation="1" light> -->
    <v-app-bar app fixed elevation="3" light class="primary--text">
      <v-app-bar-nav-icon color="primary" @click.stop="back_menu_drawer = !back_menu_drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="headline text-uppercase">
        <span>EICM-</span>
        <span class="font-weight-light">GDC</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon color="primary">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon color="primary">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text icon color="primary">
            <v-avatar size="28px">
              <img :src="require('@/assets/placeholder/default.svg')" alt="Avatar" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list shaped>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in items" :key="i" @click.stop="item.click">
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
    </v-app-bar>
    <!-- =============================================== -->

    <v-main>
      <v-container fluid>
        <v-alert
          v-model="school_alert"
          v-if="schools.length==0"
          border="top"
          colored-border
          type="warning"
          elevation="2"
          dismissible
          prominent
          icon="mdi-alert"
          tile
        >
          <v-row align="center">
            <v-col
              class="grow"
            >Atenção, não se pode realizar algumas operações que dependem da instituição, pois ainda não tem nenhuma instituição configurada</v-col>
            <v-col class="shrink">
              <v-btn
                small
                :to="{ name: 'add_school'}"
                @click="school_alert=false"
                v-if="canAdd()"
                rounded
                outlined
                color="primary"
              >Configurar Uma</v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <router-view></router-view>
        <!-- <vue-progress-bar></vue-progress-bar> -->
      </v-container>
    </v-main>
    <!-- =============================================== -->

    <v-footer app fixed>
      <span class="caption">EICM-GDC &copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
      <span class="caption">DECIFRA CODE</span>
    </v-footer>
  </v-app>
</template>

<script>
import menu from "@/datas/static/menu_backend";
import { getDatas } from "@/mixins/SendForm";

export default {
  mixins: [getDatas],
  data() {
    return {
      school_alert: true,
      back_menu_drawer: true,
      backend_mini_drawer: true,
      menus: menu,
      dark: false,
      scrollSettings: {
        maxScrollbarLength: 160
      },

      items: [
        {
          icon: "mdi-account-details",
          href: "#",
          title: "Meu Perfil",
          //eslint-disable-next-line
          click: e => {
            this.$router.push({ name: "perfil" });
          }
        },
        {
          icon: "mdi-home",
          title: "Início",
          //eslint-disable-next-line
          click: e => {
            this.redirectPage("home_page");
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

  created() {
    this.getAll(this.schools, "getSchools");
    // this.adminTeste();
  },

  computed: {
    schools: function() {
      return this.$store.getters.schools;
    }
  },

  methods: {
    // adminTeste() {
    //   // eslint-disable-next-line no-console
    //   console.log(this._is("Admihghhgfn"));
    // },
    redirectPage(name) {
      this.$router.push({ name: name });
    },

    genChildTarget(item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component
        };
      }
      return { name: `${item.group}/${subItem.name}` };
    },

    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/");
    }
  }
};
</script>
