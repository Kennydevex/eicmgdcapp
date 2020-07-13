<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12">
        <v-card tile class="mb-5">
          <v-img
            @mouseenter="change_avatar_btn=true"
            @mouseleave="change_avatar_btn=false"
            class="white--text align-end"
            height="200px"
            :src="require('../../assets/app/perfil_cover.gif')"
          >
            <v-row>
              <v-col align="center" class="pb-0 mb-0" cols="12">
                <v-avatar class="profile" color="grey lighten-2" size="124">
                  <v-img class="white--text align-end" :src="avatarPath"></v-img>
                </v-avatar>
                <input
                  accept="image/png, image/jpeg"
                  style="display:none"
                  type="file"
                  @change="onAvatarChange"
                  name="avatar"
                  ref="upload_avatar_form"
                />
              </v-col>

              <v-col align="center" class="pt-0 mt-0">
                <transition name="fade">
                  <v-btn
                    rounded
                    v-if="change_avatar_btn || formData.avatar.length > 500"
                    x-small
                    class="text-none ma-1"
                    dark
                    @click="onActiveAvatarField()"
                  >Alterar</v-btn>
                </transition>
                <v-btn
                  rounded
                  v-if="formData.avatar.length > 500"
                  x-small
                  class="text-none ma-1"
                  color="success"
                  @click="onUpdateAvatar()"
                >Guradar</v-btn>
              </v-col>
            </v-row>
          </v-img>

          <v-card-text class="ma-0 pa-0">
            <v-container grid-list-xs ma-0 pa-0>
              <v-row>
                <v-col cols="12" align="left" class="my-0 py-0">
                  <v-expansion-panels tile mandatory focusable hover>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        class="primary--text"
                        expand-icon="mdi-login"
                        disable-icon-rotate
                      >Dados da conta</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-list dense>
                          <v-subheader>Dados da Conta</v-subheader>
                          <v-list-item-group color="primary">
                            <v-list-item :ripple="false">
                              <v-list-item-icon>
                                <v-icon>mdi-email</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <v-list-item-title>Email Primário</v-list-item-title>
                                <v-list-item-subtitle>{{authUser.email}}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>

                            <v-list-item :ripple="false">
                              <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <v-list-item-title>Nome Utilizador</v-list-item-title>
                                <v-list-item-subtitle>{{authUser.username}}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>

                            <v-list-item :ripple="false">
                              <v-list-item-icon>
                                <v-icon>mdi-update</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <v-list-item-title>Ativação da Conta</v-list-item-title>
                                <v-list-item-subtitle>{{authUser.updated_at}}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>

                        <v-col cols="12" class="py-0 my-0">
                          <v-btn
                            outlined
                            small
                            :color="changing_password?'error':'primary'"
                            class="text-none ma-1"
                            @click="changing_password=!changing_password"
                          >{{changing_password?'Cancelar':'Alterar a Palavra Passe'}}</v-btn>

                          <v-btn
                            outlined
                            small
                            v-if="changing_password"
                            color="primary"
                            class="text-none ma-1"
                            @click="onChangePassword('form-change-password')"
                          >Guardar</v-btn>

                          <transition name="fade">
                            <v-form
                              ref="form"
                              data-vv-scope="form-change-password"
                              v-if="changing_password"
                            >
                              <v-row>
                                <v-col cols="6">
                                  <v-text-field
                                    v-model="formData.old_password"
                                    dense
                                    name="name"
                                    label="Palavra passe atual"
                                    v-validate="'required|min:8'"
                                    data-vv-name="form-change-password.old_password"
                                    :error-messages="password_msg || errors.collect('form-change-password.old_password')"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field
                                    v-model="formData.password"
                                    dense
                                    name="name"
                                    label="Nova palavra Passe"
                                    v-validate="'required|min:8'"
                                    data-vv-name="form-change-password.password"
                                    :error-messages="old_password_msg || errors.collect('form-change-password.password')"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-form>
                          </transition>
                        </v-col>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header
                        class="primary--text"
                        expand-icon="mdi-account"
                        disable-icon-rotate
                      >Informações Pessoais</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="12" md="6" align="left">
                            <v-list dense>
                              <v-list-item-group color="primary">
                                <v-list-item :ripple="false">
                                  <v-list-item-content>
                                    <v-list-item-title>Primeiro Nome</v-list-item-title>
                                    <v-list-item-subtitle>{{authUser.folk.name}}</v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>

                                <v-list-item :ripple="false">
                                  <v-list-item-content>
                                    <v-list-item-title>Apelido</v-list-item-title>
                                    <v-list-item-subtitle>{{authUser.folk.lastname}}</v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                          </v-col>

                          <v-col cols="12" md="6" align="left">
                            <v-list dense>
                              <v-list-item-group color="primary">
                                <v-list-item :ripple="false">
                                  <v-list-item-content>
                                    <v-list-item-title>Data de Nascimento</v-list-item-title>
                                    <v-list-item-subtitle>{{authUser.folk.birthdate?authUser.folk.birthdate:'Sem registo'}}</v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>

                                <v-list-item :ripple="false">
                                  <v-list-item-content>
                                    <v-list-item-title>Sexo</v-list-item-title>
                                    <v-list-item-subtitle>{{authUser.folk.gender==0?'Masculino':authUser.folk.gender==1?'Feminino':'Sem registo'}}</v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                          </v-col>

                          <v-col>
                            <v-dialog
                              scrollable
                              v-model="edit_perfil_dialog"
                              persistent
                              max-width="500px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  color="primary"
                                  small
                                  outlined
                                  class="text-none"
                                  dark
                                  v-bind="attrs"
                                  v-on="on"
                                >Editar informações</v-btn>
                              </template>
                              <v-card>
                                <v-card-title>
                                  <span class="title font-weight-regular">
                                    <v-icon>mdi-account-edit</v-icon>
                                  </span>
                                </v-card-title>
                                <v-card-text class="mb-0 pb-0">
                                  <v-container ma-0 pa-0 mt-3>
                                    <v-form ref="form" data-vv-scope="form-edit-perfil">
                                      <v-row>
                                        <v-col cols="12" md="6" class="py-0 my-0">
                                          <v-text-field
                                            v-model="formData.folk.name"
                                            dense
                                            outlined
                                            label="Nome*"
                                            v-validate="'required|alpha'"
                                            data-vv-name="form-edit-perfil.name"
                                            :error-messages="errors.collect('form-edit-perfil.name')"
                                          ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6" class="py-0 my-0">
                                          <v-text-field
                                            v-model="formData.folk.lastname"
                                            dense
                                            outlined
                                            label="Apelido*"
                                            v-validate="'required|alpha_spaces'"
                                            data-vv-name="form-edit-perfil.lastname"
                                            :error-messages="errors.collect('form-edit-perfil.lastname')"
                                          ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6" class="py-0 my-0">
                                          <v-select
                                            v-model="formData.folk.gender"
                                            outlined
                                            dense
                                            :items="genders"
                                            item-text="gender"
                                            item-value="value"
                                            label="Sexo"
                                          ></v-select>
                                        </v-col>

                                        <v-col cols="12" md="6" class="mb-0 py-0">
                                          <input
                                            style="display:none"
                                            name="birthdate_field_target"
                                            ref="valBirthdateRef"
                                            v-model="actual_date"
                                            type="text"
                                          />
                                          <v-menu
                                            v-model="birthdate_menu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                            ref="birth_date_menu"
                                          >
                                            <template v-slot:activator="{ on }">
                                              <v-text-field
                                                dense
                                                outlined
                                                name="birthdate"
                                                :value="formated(formData.folk.birthdate)"
                                                label="Nascimento"
                                                prepend-inner-icon="mdi-calendar"
                                                readonly
                                                v-on="on"
                                                v-validate="'date_format:dd/MM/yyyy|before:valBirthdateRef'"
                                                data-vv-as="birthdate"
                                                :error-messages="errorMsg('folk.birthdate') || errors.collect('birthdate')"
                                              ></v-text-field>
                                              <!-- error-messages="Teste" -->
                                            </template>
                                            <v-date-picker
                                              no-title
                                              ref="birth_date_picker"
                                              :max="new Date().toISOString().substr(0, 10)"
                                              min="1950-01-01"
                                              v-model="formData.folk.birthdate"
                                              @input="birthdate_menu=false"
                                              locale="pt-pt"
                                            ></v-date-picker>
                                          </v-menu>
                                        </v-col>

                                        <v-col cols="12" class="py-0 my-0">
                                          <v-text-field
                                            v-model="formData.email"
                                            dense
                                            outlined
                                            label="Email*"
                                            v-validate="'required|email'"
                                            data-vv-name="form-edit-perfil.email"
                                            :error-messages="errorMsg('email') || errors.collect('form-edit-perfil.email')"
                                          ></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-form>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <small class="info--text">
                                    <v-icon small color="info">mdi-information</v-icon>Ao guardar as alterações, a sua sessão será reiniciada, para carregar informações atualizadas.
                                  </small>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="edit_perfil_dialog = false"
                                    class="text-none"
                                  >Cancelar</v-btn>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    class="text-none"
                                    @click="onEditPerfil('form-edit-perfil')"
                                  >Guardar</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel v-if="authUser.permissions.length || authUser.roles.length">
                      <v-expansion-panel-header
                        class="primary--text"
                        expand-icon="mdi-lock"
                        disable-icon-rotate
                      >Acessos e Permissões</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="12" md="6" v-if="authUser.permissions.length">
                            <v-list dense rounded>
                              <v-subheader>Papeis/Funções do Utilizador</v-subheader>

                              <v-list-item-group color="primary">
                                <v-list-item
                                  :ripple="false"
                                  v-for="(permission, r) in authUser.permissions"
                                  :key="'permission'+r"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>{{permission.name}}</v-list-item-title>
                                    <v-list-item-subtitle>Atribuido em: {{permission.updated_at}}</v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                          </v-col>
                          <v-col cols="12" md="6" v-if="authUser.roles.length">
                            <v-list rounded dense>
                              <v-subheader>Papeis/Funções do Utilizador</v-subheader>
                              <v-list-item-group color="primary">
                                <v-list-item
                                  :ripple="false"
                                  v-for="(role, r) in authUser.roles"
                                  :key="'role'+r"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>{{role.name}}</v-list-item-title>
                                    <v-list-item-subtitle>Atribuido em: {{role.updated_at}}</v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import { dateFormat } from "@/mixins/DateTime";
import { getBackEndError } from "@/mixins/SendForm";
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { viewAndUpdate } from "@/mixins/Redirects";

export default {
  mixins: [dateFormat, getBackEndError, clearForm, flashAlert, viewAndUpdate],

  data() {
    return {
      change_avatar_btn: false,
      password_msg: null,
      old_password_msg: null,
      formErrors: {},
      changing_password: false,
      edit_perfil_dialog: false,
      birthdate_menu: false,
      formData: {
        folk: {
          name: "",
          lastname: "",
          gender: "",
          birthdate: ""
        },
        email: "",
        old_password: "",
        avatar: "",
        password: ""
      },

      genders: [
        { gender: "Masculino", value: "0" },
        { gender: "Feminino", value: "1" }
      ]
    };
  },

  created() {
    this.setUserPerfilForm();
  },

  computed: {
    avatarPath() {
      return this.formData.avatar
        ? this.formData.avatar.length > 500
          ? this.formData.avatar
          : this.apiUrl + "/images/app/system/users/" + this.formData.avatar
        : this.apiUrl + "/images/app/system/users/default.svg";
    }
  },

  methods: {
    setUserPerfilForm() {
      this.formData.id = this.authUser.id;
      this.formData.avatar = this.authUser.avatar;
      this.formData.email = this.authUser.email;
      this.formData.username = this.authUser.username;
      this.formData.folk.id = this.authUser.folk.id;
      this.formData.folk.name = this.authUser.folk.name;
      this.formData.folk.lastname = this.authUser.folk.lastname;
      this.formData.folk.gender = this.authUser.folk.gender;
      this.formData.folk.birthdate = this.authUser.folk.birthdate;
    },

    onChangePassword(scope) {
      this.password_msg = null;
      this.old_password_msg = null;
      this.$validator.validateAll(scope).then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          // eslint-disable-next-line no-undef
          axios
            .put(
              "change_password/" + this.$data.formData.id,
              this.$data.formData
            )
            .then(response => {
              this.formErrors = {};
              if (response.data.exist === 0) {
                this.password_msg = response.data.msg;
                return;
              }

              if (response.data.exist === 2) {
                this.old_password_msg = response.data.msg;
                return;
              }

              this.changing_password = false;
              this.feedback(
                "success",
                response.data.msg,
                3000,
                true,
                "top-end"
              );
              this.logout();
            })
            .catch(err => {
              this.password_msg = null;
              this.old_password_msg = null;
              this.formErrors = err.response.data.errors;
            });
        }
      });
    },

    onEditPerfil(scope) {
      this.$validator.validateAll(scope).then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          // eslint-disable-next-line no-undef
          axios
            .put(
              "update_profile/" + this.$data.formData.id,
              this.$data.formData
            )
            .then(response => {
              this.formErrors = {};
              this.edit_perfil_dialog = false;
              // this.feedback(
              //   "success",
              //   response.data.msg,
              //   3000,
              //   true,
              //   "top-end"
              // );

              this.registerCreated(
                "success",
                "Resgisto Atualizado",
                response.data.msg,
                "Reinicie a sua sessão para recarregar os dados atualizados"
              );

              this.logout();
            })
            .catch(err => {
              this.formErrors = err.response.data.errors;
            });
        }
      });
    },

    onUpdateAvatar() {
      // eslint-disable-next-line no-undef
      axios
        .put("update_avatar/" + this.$data.formData.id, this.$data.formData)
        .then(response => {
          this.feedback("success", response.data.msg, 3000, true, "top-end");
          this.logout();
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err.response.data.errors);
        });
    },

    onActiveAvatarField() {
      this.$refs.upload_avatar_form.click();
    },

    onAvatarChange(e) {
      const file = e.target.files[0] || e.dataTransfer.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = event => {
        this.formData.avatar = event.target.result;
      };
    },
    logout() {
      this.$store.commit("logout");
      this.onView("login_page");
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>