<template>
  <v-form ref="form">
    <v-container fluid grid-list-xs>
      <v-row>
        <v-col cols="12" class="my-0 py-0">
          <v-card flat>
            <v-card-title class="pa-0">
              <v-col cols="12" :md="formData.type==3 || !formData.type?4:4">
                <v-autocomplete
                  outlined
                  clearable
                  name="type"
                  v-model="formData.type"
                  dense
                  hide-no-data
                  disable-lookup
                  no-filter
                  label="Destino do slider"
                  :items="slider_types"
                  item-text="name"
                  item-value="id"
                  prepend-inner-icon="mdi-folder-plus-outline"
                  @change="resetData()"
                  v-validate="'required'"
                  data-vv-name="type"
                  :error-messages="errors.collect('type')"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="8" v-if="formData.type && formData.type != 3">
                <v-autocomplete
                  outlined
                  clearable
                  name="slider_dst"
                  v-model="slider_dst"
                  dense
                  hide-no-data
                  disable-lookup
                  no-filter
                  :disabled="formData.type==3"
                  :label="formData.type==1?'Seleciones os cursos em destaques':formData.type==2?'Selecione os artigos destacados':''"
                  :items="formData.type==1?courses:formData.type==2?articles:[]"
                  :item-text="formData.type==1?'name':'title'"
                  item-value="id"
                  prepend-inner-icon="mdi-folder-plus-outline"
                  @change="setSliderTitle(slider_dst)"
                  v-validate="'required'"
                  data-vv-name="slider_dst"
                  :error-messages="errors.collect('slider_dst')"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" :md="formData.type==3 || !formData.type?8:12">
                <v-text-field
                  :disabled="!formData.type || formData.type==1||formData.type==2"
                  outlined
                  v-model="formData.title"
                  dense
                  name="title"
                  label="Título do Slider"
                  v-validate="'required'"
                  data-vv-name="title"
                  :error-messages="errors.collect('title')"
                ></v-text-field>
              </v-col>
            </v-card-title>
            <v-img
              class="mx-3"
              :contain="formData.background=='default.svg' || !formData.background"
              height="170px"
              :src="sliderBackgroundPath"
            >
              <v-container grid-list-xs>
                <v-row>
                  <v-col class="px-5 mx-3" align="left">
                    <v-btn fab @click="formData.background=null" small color="grey lighten-5">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>

            <v-card-title class="pa-0">
              <v-col cols="12" md="4">
                <v-autocomplete
                  outlined
                  name="type"
                  v-model="formData.background_type"
                  dense
                  hide-no-data
                  disable-lookup
                  no-filter
                  label="Tipo de fundo"
                  :items="bg_types"
                  item-text="name"
                  item-value="id"
                  prepend-inner-icon="mdi-folder-plus-outline"
                  v-validate="'required'"
                  data-vv-name="background_type"
                  :error-messages="errors.collect('background_type')"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="8">
                <v-file-input
                  outlined
                  dense
                  name="background"
                  label="Capa do curso"
                  prepend-icon="mdi-image"
                  show-size
                  v-model="tempSliderBackground"
                  accept="image/png, image/jpeg, image/bmp"
                  :rules="backgroundRules"
                  v-validate="'image'"
                  data-vv-name="background"
                  :error-messages="errors.collect('background')"
                  @change.self="onSliderBackgroundUpload()"
                ></v-file-input>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  outlined
                  dense
                  rows="3"
                  name="summary"
                  label="Resumo"
                  v-model="formData.summary"
                  auto-grow
                  v-validate="'required|max:200'"
                  data-vv-name="summary"
                  :error-messages="errors.collect('summary')"
                  hint="Apresente um breve resumo deste do conteúdo apresentado"
                ></v-textarea>
              </v-col>

              <v-col cols="12" md="5">
                <v-text-field
                  outlined
                  v-model="formData.link"
                  dense
                  name="link"
                  :disabled="formData.type!=3"
                  :label="formData.type!=3?'Ligação sera inserida automaticamente':'Insira a ligação do Slider (Link)'"
                  v-validate="'required'"
                  data-vv-name="link"
                  :error-messages="errors.collect('link')"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="7">
                <v-combobox
                  outlined
                  name="type"
                  v-model="formData.btn_text"
                  dense
                  hide-no-data
                  disable-lookup
                  no-filter
                  label="Tipo de fundo"
                  :items="['Ler Mais', 'Ver Mais', 'Ver Detalhes', 'Visitar a página', 'Consultar Informações', 'Entrar']"
                  prepend-inner-icon="mdi-folder-plus-outline"
                >
                  <template v-slot:append>
                    <v-radio-group
                      class="ma-0 pa-0"
                      dense
                      hide-details
                      v-model="formData.btn_style"
                      row
                    >
                      <v-radio label="Botão" value="1"></v-radio>
                      <v-radio label="Texto" value="2"></v-radio>
                    </v-radio-group>
                  </template>
                </v-combobox>
              </v-col>

              <v-col cols="12">
                <v-subheader>Escolha a cor padrão para este slider</v-subheader>
                <v-color-picker v-model="formData.color"></v-color-picker>
              </v-col>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-actions>
              <v-switch
                small
                :label="formData.status?'(Slider Ativado) Desativar':'(Slider Desativado) Ativar'"
                v-model="formData.status"
              ></v-switch>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import validateDictionary from "@/helpers/api/validateDictionary";
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { sendFormData, getDatas } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, sendFormData, getDatas, flashAlert],
  props: ["formData", "update_form"],

  data() {
    return {
      slider_dst: "",
      formErrors: [],
      tempSliderBackground: null,
      dictionary: validateDictionary,
      backgroundRules: [
        value => !!value || "File is required",
        value =>
          !value ||
          value.size < 2000000 ||
          "Imagem de capa não pode ter um tamanho superior a 2MB"
      ],
      slider_types: [
        { id: "1", name: "Cursos e Formações" },
        { id: "2", name: "Publicações" },
        { id: "3", name: "Ligações externas" }
      ],

      bg_types: [
        { id: "1", name: "Imagem" },
        { id: "2", name: "Vídeo" },
        { id: "3", name: "Cor Sólida" }
      ],

      articles: [
        {
          id: "1",
          title: "teste1",
          slug: "artigo_1",
          summary: "Alguma coisa de sumário"
        },
        {
          id: "2",
          title: "teste2",
          slug: "artigo_2",
          summary: "Alguma coisa de sumário"
        },
        {
          id: "3",
          title: "teste3",
          slug: "artigo_3",
          summary: "Alguma coisa de sumário"
        }
      ]
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    this.getAll(this.courses, "getFeaturedCourses");

    window.getApp.$on("APP_ADD_SLIDER", add_new => {
      this.add(
        add_new,
        "sliders",
        this.$props.formData,
        "APP_UPDATE_ALL_SLIDERS_DATA",
        "APP_ADD_SLIDER_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_SLIDER", () => {
      this.update(
        "sliders/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_SLIDER_MODAL"
      );
    });
  },

  computed: {
    courses: function() {
      return this.$store.getters.featured_courses;
    },

    sliderBackgroundPath() {
      return !this.update_form
        ? this.formData.background
          ? this.formData.background
          : this.apiUrl + "/images/app/sliders/default.svg"
        : this.formData.background
        ? this.formData.background.length > 50
          ? this.formData.background
          : this.apiUrl + "/images/app/sliders/" + this.formData.background
        : this.apiUrl + "/images/app/sliders/default.svg";
    }
  },

  methods: {
    setSliderTitle(id) {
      let course = this.courses.find(course => course.id === id);
      let article = this.articles.find(article => article.id === id);
      if (this.formData.type == 1) {
        this.formData.title = "Curso de " + course.name;
        this.formData.link = course.slug;
        this.formData.summary = course.description;
      }

      if (this.formData.type == 2) {
        this.formData.title = article.title;
        this.formData.link = article.slug;
        this.formData.summary = article.summary;
      }
    },

    resetData() {
      this.slider_dst = "";
      this.formData.title = "";
      this.formData.link = "";
      this.formData.summary = "";
    },

    onSliderBackgroundUpload() {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.tempSliderBackground);
      fileReader.onload = ev => {
        this.formData.background = ev.target.result;
      };
    }
  }
};
</script>