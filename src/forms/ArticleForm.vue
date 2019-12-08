<template>
  <v-form ref="form">
    <v-container fluid grid-list-xs>
      <v-row>
        <v-col cols="12" md="9" class="my-0 py-0">
          <v-text-field
            label="Título da Publicação*"
            name="name"
            v-model="formData.title"
            outlined
            autofocus
            v-validate="'required'"
            data-vv-validate-on="blur"
            data-vv-name="title"
            :error-messages="errors.collect('title')"
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
            outlined
            rounded
            placeholder="Imagem de fundo"
            prepend-icon="mdi-camera"
            show-size
            :rules="coverRules"
            v-model="imgTemp"
            v-validate="'required'"
            data-vv-name="image"
            :error-messages="errors.collect('image')"
            @change="onFileUpload"
          ></v-file-input>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-textarea
            label="Resumo da publicação*"
            name="summary"
            hint="Apresente um greve resumo da sua publicação"
            v-model="formData.summary"
            outlined
            rows="2"
            v-validate="'required'"
            data-vv-name="summary"
            :error-messages="errors.collect('summary')"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="9" class="my-0 py-0">
          <v-textarea
            label="Conteúdo da publicação*"
            name="content"
            hint="Descreva aqui a sua publicação"
            v-model="formData.content"
            outlined
            rows="12"
            v-validate="'required'"
            data-vv-name="content"
            :error-messages="errors.collect('content')"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="3" class="my-0 py-0">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-autocomplete
                v-model="formData.category"
                outlined
                no-data-text="Nenhuma categoria com este nome"
                hide-selected
                label="Selecionar uma categoria*"
                clearable
                :items="categories"
                item-text="name"
                item-value="key"
                prepend-inner-icon="mdi-folder-plus-outline"
                v-validate="'required'"
                data-vv-name="category"
                :error-messages="errors.collect('category')"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="my-0 py-0">
              <v-autocomplete
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
                item-value="key"
                prepend-inner-icon="mdi-tag-outline"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" class="my-0 py-0">
              <v-checkbox label="Publicar esta publicação" v-model="formData.status"></v-checkbox>
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
              <v-subheader>Definir data de publicação</v-subheader>
            </v-col>

            <v-col cols="12" md="6" class="my-0 py-0">
              <v-text-field outlined name="name" label="Início" id="id"></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="my-0 py-0">
              <v-text-field outlined name="name" label="Fim" id="id"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import validateDictionary from "@/helpers/api/validateDictionary";
import { clearForm } from "@/mixins/Form";
// import moment from "moment";
import { sendFormData, getDatas } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, sendFormData, getDatas],
  props: ["formData"],

  data() {
    return {
      imgTemp: null,
      dictionary: validateDictionary,
      coverRules: [
        value => !!value || "File is required",
        value =>
          !value ||
          value.size < 2000000 ||
          "Imagem de capa não pode ter um tamanho superior a 2MB"
      ]
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  computed: {
    categories: function() {
      return this.$store.getters.categories;
    },
    tags: function() {
      return this.$store.getters.tags;
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
        "APP_CANCEL_ADD_ARTICLE"
      );
    });

    // window.getApp.$on("APP_UPDATE_ARTICLE", () => {
    //   this.update(
    //     "users/" + this.$props.formData.id,
    //     this.$props.formData,
    //     "APP_CANCEL_UPDATE_ARTICLE"
    //   );
    // });
  },

  methods: {
    onFileUpload(e) {
      let fileReader = new FileReader();
      try {
        fileReader.readAsDataURL(e);
        fileReader.onload = ev => {
          this.formData.image = ev.target.result;
        };
      } catch (error) {
        //eslint-disable-next-line
        console.log(error);
      }
    }
  }
};
</script>