<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12">
        <v-card tile class="mb-5">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="require('../../assets/app/perfil_cover.gif')"
          >
            <v-row>
              <v-col align="left" class="ma-1">
                <v-avatar class="profile" color="grey lighten-2" size="124">
                  <img
                    :src="`${apiUrl}/images/app/system/users/${authUser.avatar}`"
                    alt="User Avatar"
                  />
                </v-avatar>
              </v-col>
            </v-row>
          </v-img>

          <v-card-text>
            <v-container grid-list-xs>
              <v-row>
                <v-col cols="12" align="left">
                  <v-list dense>
                    <v-subheader>Dados da Conta</v-subheader>
                    <v-list-item-group color="primary">
                      <v-list-item :ripple="false">
                        <v-list-item-icon>
                          <v-icon>mdi-email</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{authUser.email}}</v-list-item-title>
                          <v-list-item-subtitle>Email Primário</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item :ripple="false">
                        <v-list-item-icon>
                          <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{authUser.username}}</v-list-item-title>
                          <v-list-item-subtitle>Nome Utilizador</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item :ripple="false">
                        <v-list-item-icon>
                          <v-icon>mdi-update</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{authUser.updated_at}}</v-list-item-title>
                          <v-list-item-subtitle>Ativação da Conta</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>

                <v-col cols="10" class="py-0 my-0">
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

                  <v-form ref="form" data-vv-scope="form-change-password" v-if="changing_password">
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="formData.old_password"
                          filled
                          dense
                          name="name"
                          label="Palavra passe atual"
                          v-validate="'required|min:8'"
                          data-vv-name="form-change-password.old_password"
                          :error-messages="errorMsg('old_password') || errors.collect('form-change-password.old_password')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="formData.password"
                          filled
                          dense
                          name="name"
                          label="Nova palavra Passe"
                          v-validate="'required|min:8'"
                          data-vv-name="form-change-password.password"
                          :error-messages="errorMsg('password') || errors.collect('form-change-password.password')"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" class="ma-0 pa-0">
                  <v-subheader>Informações pessoais e Contactos</v-subheader>
                </v-col>
                <v-col cols="12" md="6" align="left">
                  <v-list dense>
                    <v-list-item-group color="primary">
                      <v-list-item :ripple="false">
                        <v-list-item-content>
                          <v-list-item-title>{{authUser.folk.name}}</v-list-item-title>
                          <v-list-item-subtitle>Primeiro Nome</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item :ripple="false">
                        <v-list-item-content>
                          <v-list-item-title>{{authUser.folk.lastname}}</v-list-item-title>
                          <v-list-item-subtitle>Apelido</v-list-item-subtitle>
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
                          <v-list-item-title>{{authUser.folk.birthdate?authUser.folk.birthdate:'Sem registo'}}</v-list-item-title>
                          <v-list-item-subtitle>Data de Nascimento</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item :ripple="false">
                        <v-list-item-content>
                          <v-list-item-title>{{authUser.folk.gender==0?'Masculino':authUser.folk.gender==1?'Feminino':'Sem registo'}}</v-list-item-title>
                          <v-list-item-subtitle>Sexo</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>

                <!-- <v-col>
                  <v-btn small outlined class="text-none" color="primary">Editar Informações</v-btn>
                </v-col>-->

                <v-col>
                  <v-dialog scrollable v-model="edit_perfil_dialog" persistent max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        small
                        outlined
                        class="text-none"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >Editar Perfil</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="title font-weight-regular">
                          <v-icon>mdi-account-edit</v-icon>
                        </span>
                      </v-card-title>
                      <v-card-text class="mb-0 pb-0">
                        <v-container ma-0 pa-0>
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

              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="6" v-if="authUser.permissions.length">
                  <v-list dense rounded>
                    <v-subheader>Permissões/Previlégios de Acesso</v-subheader>
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

export default {
  mixins: [dateFormat, getBackEndError],

  data() {
    return {
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
        password: ""
      },

      genders: [
        { gender: "Masculino", value: 0 },
        { gender: "Feminino", value: 1 }
      ]
    };
  },

  methods: {
    onChangePassword(scope) {
      this.$validator.validateAll(scope).then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          //eslint-disable-next-line no-undef
          // axios
          //   .post("subscribe", this.$data.formData)
          //   .then(response => {
          //     this.formErrors = {};
          //     this.clear();
          //     this.registerCreated(
          //       "success",
          //       "Subscrito",
          //       response.data.msg,
          //       "A equipa da EICM-GDC agradece a sua subscrição, de agora em diante receberás notificações das nossas publicações em primeira mão"
          //     );
          //   })
          //   .catch(err => {
          //     this.formErrors = err.response.data.errors;
          //   });
        }
      });
    },

    onEditPerfil(scope) {
      this.$validator.validateAll(scope).then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          //eslint-disable-next-line no-undef
          // axios
          //   .post("subscribe", this.$data.formData)
          //   .then(response => {
          //     this.formErrors = {};
          //     this.clear();
          //     this.registerCreated(
          //       "success",
          //       "Subscrito",
          //       response.data.msg,
          //       "A equipa da EICM-GDC agradece a sua subscrição, de agora em diante receberás notificações das nossas publicações em primeira mão"
          //     );
          //   })
          //   .catch(err => {
          //     this.formErrors = err.response.data.errors;
          //   });
        }
      });
    }
  }
};
</script>