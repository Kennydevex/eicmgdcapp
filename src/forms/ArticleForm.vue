<template>
  <v-form ref="form">
    <v-container fluid grid-list-xs>
      <v-row>
        <!-- <v-col cols="12" md="9" class="my-0 py-0" v-if="update_form">imagem aqui</v-col> -->
        <v-col cols="12" md="9" class="my-0 py-0">
          <v-text-field
            dense
            label="Título da Publicação*"
            name="name"
            v-model="formData.title"
            outlined
            autofocus
            v-validate="'required'"
            data-vv-validate-on="blur"
            data-vv-name="title"
            :error-messages="errorMsg('title') || errors.collect('title')"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3" class="my-0 py-0">
          <!-- <file-upload
            :accept="'image/png, image/jpeg, image/bmp'"
            :label="'Capa da publicação'"
            :outlined="true"
            :chips="true"
            :placeholder="'Imagem de apresentação da publicação'"
            @handleFileUpload="uploadCover"
           
            :formD="formData.cover"
          ></file-upload>-->

          <v-file-input
            dense
            outlined
            :placeholder="!update_form?'Imagem de fundo':'Alterar Imagem'"
            prepend-icon="mdi-camera"
            show-size
            :rules="coverRules"
            v-model="imgTemp"
            v-validate="!update_form?'required':''"
            data-vv-name="image"
            :error-messages="errors.collect('image')"
            @change="onFileUpload"
          ></v-file-input>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-textarea
            dense
            label="Resumo da publicação*"
            name="summary"
            hint="Apresente um greve resumo da sua publicação"
            v-model="formData.summary"
            outlined
            rows="2"
            counter
            v-validate="'required|max:200'"
            data-vv-name="summary"
            :error-messages="errorMsg('summary') || errors.collect('summary')"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="9" class="my-0 py-0">
          <tinymce
            ref="tm_editor"
            id="d1"
            v-model="formData.content"
          ></tinymce>
        </v-col>

        <v-col cols="12" md="3" class="my-0 py-0">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-autocomplete
                dense
                v-model="formData.category_id"
                outlined
                no-data-text="Nenhuma categoria com este nome"
                hide-selected
                label="Selecionar uma categoria*"
                clearable
                :items="categories"
                item-text="name"
                item-value="id"
                prepend-inner-icon="mdi-folder-plus-outline"
                v-validate="'required'"
                data-vv-name="category"
                :error-messages="errors.collect('category')"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="my-0 py-0">
              <v-autocomplete
                small-chips
                dense
                v-model="formData.tags"
                outlined
                no-data-text="Marcador não encontrado"
                hide-selected
                label="Indicar Marcadores"
                clearable
                multiple
                chips
                deletable-chips
                :items="tags"
                item-text="name"
                item-value="id"
                prepend-inner-icon="mdi-tag-outline"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" class="my-0 py-0">
              <v-checkbox
                @change="setDisableArticleStartDate()"
                label="Publicar esta publicação"
                v-model="formData.status"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="my-0 py-0">
              <v-switch
                v-model="formData.featuring"
                label="Colocar em destaque"
                color="primary"
                value
                input-value="true"
                hide-details
              ></v-switch>
            </v-col>

            <v-col cols="12" class="mt-5 mb-0 pb-0">
              <v-divider></v-divider>
              <v-subheader>Definir data de publicação (Opcional)</v-subheader>
            </v-col>

            <v-col cols="12" class="my-0 py-0">
              <input
                style="display:none"
                name="start_field_target"
                ref="valStartRef"
                v-model="actual_date"
                type="text"
              />
              <v-menu
                v-model="start_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :disabled="formData.status"
                    dense
                    outlined
                    name="start"
                    :value="formated(formData.start)"
                    label="Início"
                    prepend-inner-icon="mdi-calendar-arrow-right"
                    readonly
                    v-on="on"
                    v-validate="'date_format:dd/MM/yyyy|after:valStartRef'"
                    data-vv-as="start"
                    :error-messages="errorMsg('start') || errors.collect('start')"
                  ></v-text-field>
                  <!-- error-messages="Teste" -->
                </template>
                <v-date-picker
                  no-title
                  :min="new Date().toISOString().substr(0, 10)"
                  v-model="formData.start"
                  @input="start_menu=false"
                  locale="pt-pt"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" class="my-0 py-0">
              <input
                style="display:none"
                name="end_field_target"
                v-model="initialEndDate"
                ref="valEndRef"
                type="text"
              />
              <v-menu
                v-model="end_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    dense
                    outlined
                    name="end"
                    :value="formated(formData.end)"
                    label="Fím"
                    prepend-inner-icon="mdi-calendar-arrow-left"
                    readonly
                    v-on="on"
                    v-validate="'date_format:dd/MM/yyyy|after:valEndRef'"
                    data-vv-as="end"
                    :error-messages="errorMsg('end') || errors.collect('end')"
                  ></v-text-field>
                </template>
                <v-date-picker
                  no-title
                  :min="formData.start || new Date().toISOString().substr(0, 10)"
                  v-model="formData.end"
                  @input="end_menu=false"
                  locale="pt-pt"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { clearForm } from "@/mixins/Form";
import { dateFormat } from "@/mixins/DateTime";
import { sendFormData, getDatas, getBackEndError } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, dateFormat, sendFormData, getDatas, getBackEndError],
  props: ["formData", "update_form"],

  data() {
    return {
      start_menu: false,
      end_menu: false,
      formErrors: [],
      imgTemp: null,
      coverRules: [
        value => !!value || "File is required",
        value =>
          !value ||
          value.size < 2000000 ||
          "Imagem de capa não pode ter um tamanho superior a 2MB"
      ],
    };
  },

  computed: {
    categories: function() {
      return this.$store.getters.categories;
    },
    tags: function() {
      return this.$store.getters.tags;
    },

    initialEndDate() {
      return window.moment(this.$props.formData.start).format("DD/MM/YYYY");
    }
  },

  created() {
    this.getAll(this.categories, "getCategories");
    this.getAll(this.tags, "getTags");

    window.getApp.$on("APP_ADD_ARTICLE", add_new => {
      this.add(
        add_new,
        "articles",
        this.$props.formData,
        "APP_UPDATE_ALL_ARTICLES_DATA",
        "APP_CANCEL_ADD_ARTICLE",
        false,
        "list_articles"
      );
    });

    window.getApp.$on("APP_UPDATE_ARTICLE", () => {
      this.update(
        "articles/" + this.$props.formData.slug,
        this.$props.formData,
        "APP_UPDATE_ALL_ARTICLES_DATA",
        false,
        "list_articles"
      );
    });
  },

  methods: {
    setDisableArticleStartDate() {
      this.formData.start = "";
    },

    onFileUpload(e) {
      let fileReader = new FileReader();
      try {
        fileReader.readAsDataURL(e);
        fileReader.onload = ev => {
          this.formData.cover = ev.target.result;
        };
      } catch (error) {
        //eslint-disable-next-line
        console.log(error);
      }
    }
  },

  components: {}
};
</script>
