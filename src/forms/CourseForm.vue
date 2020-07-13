<template>
  <div>
    <div v-if="departments.length==0">
      <v-alert
        border="top"
        colored-border
        type="error"
        elevation="2"
        dismissible
        prominent
        icon="mdi-alert"
        tile
      >
        <v-row align="center">
          <v-col
            class="grow"
          >Atenção, formulário de criação do curso indesponível porque falta registar alguns dados dos quais o curso depende, como departamentos e disciplinas...</v-col>
          <v-col class="shrink">
            <v-btn
              small
              :to="{ name: 'list_departments'}"
              v-if="canAdd()"
              rounded
              outlined
              text
              class="text-none ma-1"
              color="primary"
            >Configurar Departamentos</v-btn>

            <v-btn
              small
              :to="{ name: 'list_disciplines'}"
              v-if="canAdd()"
              rounded
              outlined
              color="primary"
              text
              class="text-none ma-1"
            >Gerir Disciplinas</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </div>

    <div v-else>
      <v-stepper v-model="step" non-linear vertical>
        <v-stepper-step
          :editable="update_form"
          :complete="step > 1"
          step="1"
          :rules="[() => courseForm1Error()]"
        >
          Informações Básicas
          <small>Registe as informações básicas da escola</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-form ref="form" @submit.prevent="nextStep('form-step-1')" data-vv-scope="form-step-1">
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field
                  dense
                  outlined
                  name="name"
                  label="Nome do curso"
                  v-model="formData.name"
                  v-validate="'max:100|required|alpha_spaces'"
                  data-vv-name="form-step-1.name"
                  :error-messages=" errorMsg('name') || errors.collect('form-step-1.name')"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-autocomplete
                  dense
                  name="type"
                  v-model="formData.type"
                  outlined
                  hide-no-data
                  disable-lookup
                  no-filter
                  label="Tipo de curso*"
                  :items="course_types"
                  item-text="name"
                  item-value="id"
                  prepend-inner-icon="mdi-folder-plus-outline"
                  v-validate="'required'"
                  data-vv-name="form-step-1.type"
                  :error-messages=" errorMsg('type') || errors.collect('form-step-1.type')"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  dense
                  outlined
                  rows="5"
                  name="description"
                  label="Descrição do curso"
                  v-model="formData.description"
                  auto-grow
                  counter
                  v-validate="'required|max:1000'"
                  data-vv-name="form-step-1.description"
                  :error-messages=" errorMsg('description') || errors.collect('form-step-1.description')"
                  hint="Faça uma pequena apresentação deste curso"
                ></v-textarea>
              </v-col>

              <v-col cols="12" md="6" class="my-0 py-0">
                <input
                  style="display:none"
                  name="release_field_target"
                  ref="valStartReleaseRef"
                  v-model="actual_date"
                  type="text"
                />
                <v-menu
                  v-model="release_menu"
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
                      name="release"
                      :value="formated(formData.release)"
                      label="Data de lançamento do curso"
                      prepend-icon-outer="mdi-calendar"
                      readonly
                      v-on="on"
                      v-validate="'required|date_format:dd/MM/yyyy|before:valStartReleaseRef'"
                      data-vv-as="form-step-1.release"
                      :error-messages=" errorMsg('release') || errors.collect('form-step-1.release')"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    v-model="formData.release"
                    @input="release_menu=false"
                    locale="pt-pt"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="6" class="my-0 py-0">
                <v-slider
                  v-model="formData.duration"
                  thumb-label="always"
                  :thumb-size="20"
                  dense
                  step="1"
                  ticks="always"
                  tick-size="3"
                  color="primary"
                  track-color="grey"
                  :max="Maxtimer"
                  min="1"
                  hint="Defina aqui a duração deste curso"
                  persistent-hint
                >
                  <template v-slot:prepend>
                    <v-select
                      hide-no-data
                      disable-lookup
                      dense
                      hide-details
                      outlined
                      :items="duration_types"
                      item-text="name"
                      item-value="key"
                      v-model="formData.duration_type"
                      label="Duração do curso em:"
                      @change="resetDuration"
                    ></v-select>
                  </template>
                </v-slider>
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <v-row class="my-3">
              <v-col cols="12">
                <v-btn class="text-none" text type="submit" color="primary" rounded>Seguinte</v-btn>
                <v-btn class="text-none" @click.native="back()" text rounded>Sair</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-stepper-content>

        <v-stepper-step
          :editable="update_form"
          :complete="step > 2"
          step="2"
          :rules="[() => courseForm2Error()]"
        >
          Gestão do Curso
          <small>Informações referentes à coordenação do cursos e os seus módulos</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-form ref="form" @submit.prevent="nextStep('form-step-2')" data-vv-scope="form-step-2">
            <v-row class="mt-1">
              <!-- <v-col cols="12" md="6" class="mb-0 py-0">
                <v-autocomplete
                  dense
                  name="school"
                  v-model="formData.school_id"
                  outlined
                  label="Instituição*"
                  auto-select-first
                  hide-no-data
                  disable-lookup
                  :items="schools"
                  item-text="name"
                  item-value="id"
                  prepend-inner-icon="mdi-folder-plus-outline"
                  v-validate="'required'"
                  data-vv-name="form-step-2.school"
                  :error-messages="errors.collect('form-step-2.school')"
                ></v-autocomplete>
              </v-col>-->

              <v-col cols="12" class="mb-0 py-0">
                <v-autocomplete
                  dense
                  name="department"
                  v-model="formData.department_id"
                  outlined
                  hide-no-data
                  disable-lookup
                  label="Departamento do Curso*"
                  clearable
                  :items="departments"
                  item-text="name"
                  item-value="id"
                  prepend-inner-icon="mdi-folder-plus-outline"
                  v-validate="'required'"
                  data-vv-name="form-step-2.department"
                  :error-messages="errors.collect('form-step-2.department')"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <template v-for="(teacher,k) in formData.teachers">
              <v-row :key="k+'coordinator'">
                <v-col cols="12" v-if="k==0">
                  <span>Coordenação do curso</span>
                </v-col>
                <v-col cols="12" md="6" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    :name="'teacher'+k"
                    v-model="teacher.coordination.teacher_id"
                    outlined
                    hide-no-data
                    disable-lookup
                    label="Coordenador(a) do Curso"
                    clearable
                    :items="teachers"
                    item-text="employee.folk.name"
                    item-value="id"
                    prepend-inner-icon="mdi-folder-plus-outline"
                    v-validate="'required'"
                    :data-vv-name="'form-step-2.teacher'+k"
                    :error-messages=" errorMsg('teachers.'+k+'.coordination.teacher_id') || errors.collect('form-step-2.teacher'+k)"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="3" class="my-0 py-0">
                  <input
                    style="display:none"
                    name="start_date_field_target"
                    ref="valStartStart_dateRef"
                    v-model="actual_date"
                    type="text"
                  />
                  <v-menu
                    v-model="start_date_menu"
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
                        :name="'start_date'+k"
                        :value="formated(teacher.coordination.start_date)"
                        label="Início da Coordenação"
                        prepend-icon="mdi-calendar-arrow-right"
                        readonly
                        v-on="on"
                        v-validate="'required|date_format:dd/MM/yyyy|before:valStartStart_dateRef'"
                        :data-vv-as="'form-step-2.start_date'+k"
                        :error-messages=" errorMsg('teachers.'+k+'.coordination.start_date') || errors.collect('form-step-2.start_date'+k)"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      no-title
                      :max="new Date().toISOString().substr(0, 10)"
                      v-model="teacher.coordination.start_date"
                      @input="start_date_menu=false"
                      locale="pt-pt"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" md="3" class="my-0 py-0">
                  <input
                    style="display:none"
                    name="end_date_field_target"
                    ref="valStartEnd_dateRef"
                    v-model="initialEndCoordenationDate"
                    type="text"
                  />
                  <v-menu
                    v-model="end_date_menu"
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
                        :name="'end_date'+k"
                        :value="formated(teacher.coordination.end_date)"
                        label="Fim da Coordenação"
                        prepend-icon="mdi-calendar-arrow-left"
                        readonly
                        v-on="on"
                        v-validate="'date_format:dd/MM/yyyy|after:valStartEnd_dateRef|before:valStartStart_dateRef'"
                        :data-vv-as="'form-step-2.end_date'+k"
                        :error-messages=" errorMsg('teachers.'+k+'.coordination.end_date') || errors.collect('form-step-2.end_date'+k)"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      no-title
                      :max="new Date().toISOString().substr(0, 10)"
                      :min="teacher.coordination.start_date"
                      v-model="teacher.coordination.end_date"
                      @input="end_date_menu=false"
                      locale="pt-pt"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" align="right" class="my-0 py-0">
                  <v-btn
                    :color="noAttribution?'error':'primary'"
                    text
                    class="text-none"
                    small
                    @click.stop="manage_disciplines_dialog = true"
                  >{{noAttribution?'Sem disciplinas atribuidos, clique aqui para configurar as disciplinas para este curso':'Configurar as disciplinas ou os módulos para este curso'}}</v-btn>

                  <v-dialog v-model="manage_disciplines_dialog" scrollable max-width="940px">
                    <v-card>
                      <v-card-title class="grey lighten-4">
                        <small class="font-weight-light">
                          <v-icon>mdi-form-dropdown</v-icon>
                          <span>&emsp;Registar disciplinas no curso</span>
                        </small>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-autocomplete
                                outlined
                                dense
                                name="disciplines"
                                v-model="attribution.attribution.discipline_id"
                                :items="disciplines"
                                hide-no-data
                                disable-lookup
                                item-text="name"
                                item-value="id"
                                label="Disciplina*"
                                hint="Selecione uma disciplina nesta lista"
                                persistent-hint
                                @change="findRepeatedAttribution(attribution.attribution.discipline_id)"
                                :error-messages="repeatedAttribution? 'Esta disciplina já foi configurada, podes editá-la!' : ''"
                              ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                outlined
                                type="number"
                                dense
                                name="workload"
                                v-model="attribution.attribution.workload"
                                label="Carga Horária (Horas)"
                                prepend-icon="mdi-timeline-clock"
                                hint="Atribua a carga horária desta disciplina neste curso"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-autocomplete
                                dense
                                outlined
                                name="academic_year"
                                v-model="attribution.attribution.academic_year"
                                :items="['1º Ano', '2º Ano']"
                                disable-lookup
                                label="Ano curricular"
                              ></v-autocomplete>

                              <!-- <v-text-field
                                dense
                                name="academic_year"
                                :disabled="repeatedAttribution"
                                v-model="attribution.attribution.academic_year"
                                label="Ano Curricular"
                                hint="O Ano curricular em que a disciplina será lecionada"
                              ></v-text-field>-->
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-autocomplete
                                dense
                                outlined
                                name="period"
                                v-model="attribution.attribution.period"
                                :items="['1º Trimestre', '2º Trimeestre', '3º Trimeestre']"
                                disable-lookup
                                label="Periodo"
                              ></v-autocomplete>

                              <!-- <v-text-field
                                dense
                                outlined
                                name="period"
                                v-model="attribution.attribution.period"
                                label="Periodo"
                                hint="Especifique o periodo"
                              ></v-text-field>-->
                            </v-col>
                            <v-col cols="12" class="my-0 py-0">
                              <template v-if="on_edit_attribution">
                                <v-btn
                                  :disabled="!attributionValidation"
                                  @click.stop="updateAttribution()"
                                  small
                                  :color="repeatedAttribution? 'error':'primary'"
                                  class="text-none ma-1"
                                >Atualizar este registo</v-btn>

                                <v-btn
                                  @click.stop="cancelUpdateAttribution"
                                  small
                                  color="warning"
                                  class="text-none ma-1"
                                >Cancelar</v-btn>
                              </template>

                              <v-btn
                                v-else
                                :disabled="!attributionValidation"
                                @click.stop="addAttribution()"
                                small
                                :color="repeatedAttribution? 'error':'primary'"
                                class="text-none ma-1"
                              >Adicionar esta disciplina</v-btn>
                            </v-col>
                          </v-row>

                          <v-row v-if="formData.disciplines.length">
                            <v-col cols="12">
                              <v-simple-table fixed-header height="300px">
                                <template v-slot:default>
                                  <thead>
                                    <tr>
                                      <th class="text-left">Disciplina</th>
                                      <th class="text-left">Carga Horária</th>
                                      <th class="text-left">Ano Académico</th>
                                      <th class="text-left">Periodo</th>
                                      <th class="text-center">Op</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(discipline, k) in formData.disciplines"
                                      :key="'attribution'+k"
                                    >
                                      <td>
                                        <span v-for="(d, k) in disciplines" :key="'d'+k">
                                          <span
                                            v-if="d.id==discipline.attribution.discipline_id"
                                          >{{d.name}}</span>
                                        </span>
                                      </td>
                                      <td>{{ discipline.attribution.workload }}</td>
                                      <td>{{ discipline.attribution.academic_year }}</td>
                                      <td>{{ discipline.attribution.period }}</td>
                                      <td class="text-center">
                                        <v-btn
                                          @click.stop="editAttribution(k)"
                                          icon
                                          small
                                          color="warning"
                                          :disabled="on_edit_attribution"
                                        >
                                          <v-icon small>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn
                                          icon
                                          small
                                          color="error"
                                          @click.stop="removeAttribution(k)"
                                          :disabled="on_edit_attribution"
                                        >
                                          <v-icon small>mdi-delete</v-icon>
                                        </v-btn>
                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="grey darken-2"
                          text
                          small
                          class="text-none"
                          @click="cancelAllAttribution()"
                        >
                          <v-icon small>mdi-close</v-icon>Cancelar
                        </v-btn>
                        <v-btn
                          class="text-none"
                          color="blue darken-1"
                          text
                          small
                          @click="closeAttrModelAndContinue('form-step-2')"
                        >
                          <v-icon small>mdi-page-next</v-icon>Continuar com o registo do curso
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </template>
            <v-divider></v-divider>
            <v-row row wrap class="my-3">
              <v-col cols="12">
                <v-btn class="text-none" text @click.native="prevStep()" rounded>Voltar</v-btn>
                <v-btn
                  class="text-none"
                  text
                  type="submit"
                  :color="noAttribution?'error':'primary'"
                  rounded
                >Seguinte</v-btn>
                <v-btn class="text-none" @click.native="back()" text rounded>Sair</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-stepper-content>

        <v-stepper-step
          :editable="update_form"
          :complete="step > 3"
          step="3"
          :rules="[() => courseForm3Error()]"
        >
          Quesitos
          <small>Perfil de acesso ao curso e perfil de saída</small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-form ref="form" @submit.prevent="nextStep('form-step-3')" data-vv-scope="form-step-3">
            <v-row>
              <v-col cols="12" class="my-2 py-0">
                <v-textarea
                  dense
                  outlined
                  rows="5"
                  name="requirement"
                  label="Perfil de Entrada"
                  v-model="formData.requirement"
                  auto-grow
                  v-validate="'required|max:500'"
                  data-vv-name="form-step-3.requirement"
                  :error-messages=" errorMsg('requirement') || errors.collect('form-step-3.requirement')"
                  hint="Descreva as especificações necessarias para acessar o curso"
                ></v-textarea>
              </v-col>

              <v-col cols="12" class="mb-0 py-0">
                <v-autocomplete
                  v-model="formData.outcomes"
                  outlined
                  no-data-text="Nenhum perfil com esse nome"
                  chips
                  deletable-chips
                  label="Perfil de Saída"
                  counter
                  multiple
                  open-on-clear
                  :items="outcomes"
                  item-text="name"
                  item-value="id"
                  prepend-inner-icon="mdi-account-tie"
                  v-validate="'required'"
                  data-vv-name="form-step-3.outcomes"
                  :error-messages="errors.collect('form-step-3.outcomes')"
                >
                  <template v-slot:append-outer>
                    <v-btn x-small fab color="primary" @click="addMoreOutcome()">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row row wrap class="my-3">
              <v-col cols="12">
                <v-btn class="text-none" text @click.native="prevStep()" rounded>Voltar</v-btn>
                <v-btn class="text-none" text type="submit" color="primary" rounded>Seguinte</v-btn>
                <v-btn class="text-none" @click.native="back()" text rounded>Sair</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-stepper-content>

        <!-- :editable="update_form"  -->
        <v-stepper-step :editable="update_form" :complete="step > 4" step="4">
          <!-- :rules="[() => courseForm4Error()]" -->
          Apresentação
          <small>Configure as informações de apresentação da isntituição</small>
        </v-stepper-step>

        <v-stepper-content step="4">
          <v-form ref="form" @submit.prevent="nextStep('form-step-4')" data-vv-scope="form-step-4">
            <v-row>
              <v-col cols="12" md="6" class="pa-3">
                <v-row>
                  <v-col cols="12">
                    <span>Especifique que paracterize este curso curso</span>
                  </v-col>

                  <v-col cols="12" class="my-0 py-0">
                    <v-menu
                      v-model="color_menu"
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
                          name="release"
                          :value="formData.color"
                          label="Cor"
                          prepend-icon="mdi-palette"
                          placeholder="Selecione a cor que representa o curso"
                          readonly
                          v-on="on"
                        >
                          <template v-slot:append>
                            <v-chip :color="formData.color" small label></v-chip>
                          </template>
                        </v-text-field>
                      </template>
                      <v-color-picker flat v-model="formData.color"></v-color-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" md="6" class="my-0 py-0">
                <v-row>
                  <v-col cols="12">
                    <span>Imagem para representar o curso</span>
                  </v-col>
                  <v-col cols="12" class="mb-0 pb-0">
                    <v-file-input
                      dense
                      outlined
                      name="cover"
                      label="Capa do curso"
                      prepend-icon="mdi-camera"
                      show-size
                      v-model="tempCourseCover"
                      accept="image/png, image/jpeg, image/bmp"
                      :rules="coverRules"
                      v-validate="'image'"
                      data-vv-name="cover"
                      :error-messages="errors.collect('cover')"
                      @change.self="onCourseCoverUpload()"
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" class="my-0 py-0">
                    <v-img
                      :contain="formData.cover=='default.svg' || !formData.cover"
                      height="170px"
                      :src="courseCoverPath"
                    >
                      <v-row align="start" v-if="formData.cover">
                        <v-col align="right">
                          <v-btn icon @click="formData.cover=null">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-img>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-divider></v-divider>

            <v-row>
              <v-col cols="12" class="ml-4">
                <v-switch label="Ativação do curso" v-model="formData.status"></v-switch>
                <v-switch label="Distacar este curso" v-model="formData.featured"></v-switch>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row row wrap class="my-3">
              <v-col cols="12">
                <v-btn class="text-none" text @click.native="prevStep()" rounded>Voltar</v-btn>
                <v-btn
                  class="text-none"
                  text
                  :color="hasError? 'error':'primary'"
                  rounded
                  @click.stop="update_form ? updateCourse() : addCourse(false, 'form-step-4')"
                >
                  <v-icon small v-if="hasError">mdi-alert</v-icon>Salvar
                </v-btn>
                <v-btn class="text-none" @click.native="back()" text rounded>Sair</v-btn>
                <v-spacer></v-spacer>
              </v-col>
              <v-col align="end" v-if="hasError">
                <small
                  class="error--text"
                >**Os dados enviados não foram guardados, por causa de erros, verefique-os nas sessões anteriores para prosseguir com a operação</small>
              </v-col>
            </v-row>
          </v-form>
        </v-stepper-content>
      </v-stepper>
    </div>
    <add-outcome :add_extra_outcome="true"></add-outcome>
  </div>
</template> 

<script>
import AddOutcome from "../components/backend/formations/outcomes/Create";

import validateDictionary from "@/helpers/api/validateDictionary";
import { clearForm } from "@/mixins/Form";
import { dateFormat } from "@/mixins/DateTime";
import { sendFormData, getDatas, getBackEndError } from "@/mixins/SendForm";
import { imageFilesRules } from "@/mixins/FileRules";
import { multFormData } from "@/mixins/HandleMultFormData";
import { cancelActions } from "@/mixins/Redirects";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";

export default {
  props: ["formData", "update_form"],

  mixins: [
    clearForm,
    dateFormat,
    sendFormData,
    imageFilesRules,
    multFormData,
    cancelActions,
    getDatas,
    flashAlert,
    actionAlert,
    getBackEndError
  ],

  data() {
    return {
      noAttribution: false,
      repeatedAttribution: false,
      attribution_edited: "",
      on_edit_attribution: false,
      manage_disciplines_dialog: false,
      tempCourseCover: null,
      step: 1,
      release_menu: false,
      color_menu: false,
      start_date_menu: false,
      end_date_menu: false,
      duration: "",

      duration_types: [
        { key: "1", name: "Ano(s)" },
        { key: "2", name: "Mês(es)" },
        { key: "3", name: "Dia(s)" }
      ],

      dictionary: validateDictionary,

      course_types: [
        { id: "1", name: "Curso Via Técnica" },
        { id: "2", name: "Formação Profissional" },
        { id: "3", name: "Capacitação Profissinal" }
      ],

      attribution: {
        attribution: {
          discipline_id: "",
          workload: "",
          academic_year: "",
          period: ""
        }
      }
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    this.getAll(this.schools, "getSchools");
    this.getAll(this.departments, "getDepartments");
    this.getAll(this.teachers, "getActivedTeachers");
    this.getAll(this.disciplines, "getDisciplines");
    this.getAll(this.outcomes, "getOutcomes");
  },

  computed: {
    courseCoverPath() {
      // return !this.update_form?this.formData.cover?this.formData.cover:this.apiUrl+'/images/app/courses/covers/default.svg':this.formData.cover.length>50?this.formData.cover:this.apiUrl+'/images/app/courses/covers/'+this.formData.cover

      // return !this.update_form
      //   ? this.formData.cover
      //     ? this.formData.cover
      //     : this.apiUrl + "/images/app/courses/covers/default.svg"
      //   : this.formData.cover
      //   ? this.formData.cover.length > 50
      //     ? this.formData.cover
      //     : this.apiUrl + "/images/app/courses/covers/" + this.formData.cover
      //   : this.apiUrl + "/images/app/courses/covers/default.svg";

      return this.formData.cover
        ? this.formData.cover.length > 100
          ? this.formData.cover
          : this.apiUrl + "/images/app/courses/covers/" + this.formData.cover
        : this.apiUrl + "/images/app/courses/covers/default.svg";
    },

    schools: function() {
      return this.$store.getters.schools;
    },

    departments: function() {
      return this.$store.getters.departments;
    },

    teachers: function() {
      return this.$store.getters.actived_teachers;
    },

    disciplines: function() {
      return this.$store.getters.disciplines;
    },

    outcomes: function() {
      return this.$store.getters.outcomes;
    },

    Maxtimer() {
      if (this.formData.duration_type == "3") {
        return 30;
      }
      if (this.formData.duration_type == "2") {
        return 12;
      }
      return 3;
    },

    attributionValidation() {
      if (this.attribution.attribution.discipline_id == "") {
        return false;
      }
      return true;
    },

    initialEndCoordenationDate() {
      return window
        .moment(this.$props.formData.teachers[0].coordination.start_date)
        .format("DD/MM/YYYY");
    }
  },

  methods: {
    clearAttribution() {
      this.attribution = {
        attribution: {
          discipline_id: "",
          workload: "",
          academic_year: "",
          period: ""
        }
      };
    },
    removeAttribution(index) {
      this.removeFormData(index, this.formData.disciplines);
    },

    editAttribution(index) {
      this.attribution_edited = "";
      this.repeatedAttribution = false;
      let aux_attribution = this.formData.disciplines[index].attribution;
      this.attribution.attribution.discipline_id =
        aux_attribution.discipline_id;
      this.attribution.attribution.workload = aux_attribution.workload;
      this.attribution.attribution.academic_year =
        aux_attribution.academic_year;
      this.attribution.attribution.period = aux_attribution.period;
      this.attribution_edited = index;
      this.on_edit_attribution = true;
    },

    cancelAllAttribution() {
      this.repeatedAttribution = false;

      if (this.formData.disciplines.length) {
        this.deleteAlert(
          "question",
          "Cancelar",
          "Já se encontram alguns registos na lista, pretendes ignorálos?",
          "Ignorar"
        ).then(result => {
          if (result.value) {
            this.feedback(
              "error",
              "Registos ignorados, nenhum disciplina vinculada ao curso",
              3000,
              true,
              "bottom-end"
            );
            this.formData.disciplines = [];
            this.manage_disciplines_dialog = false;
            this.clearAttribution();
          }
        });
      } else this.manage_disciplines_dialog = false;
    },

    cancelUpdateAttribution() {
      this.repeatedAttribution = false;
      this.formData.disciplines[
        this.attribution_edited
      ] = this.formData.disciplines[this.attribution_edited];
      this.clearAttribution();
      this.on_edit_attribution = false;
    },

    updateAttribution() {
      if (this.repeatedAttribution) {
        return;
      }
      this.repeatedAttribution = false;
      this.formData.disciplines[this.attribution_edited] = this.attribution;
      this.clearAttribution();
      this.attribution_edited = "";
      this.on_edit_attribution = false;
    },

    addAttribution() {
      if (this.repeatedAttribution) {
        return;
      }
      this.formData.disciplines.push(this.attribution);
      this.clearAttribution();
    },

    findRepeatedAttribution(discipline_id) {
      this.repeatedAttribution = false;
      for (var i = 0; i < this.formData.disciplines.length; i++) {
        if (
          this.formData.disciplines[i].attribution.discipline_id ==
            discipline_id &&
          i !== this.attribution_edited
        ) {
          this.repeatedAttribution = true;
          return;
        }
      }
      this.repeatedAttribution = false;
      return;
    },

    addMoreOutcome() {
      window.getApp.$emit("APP_ADD_OUTCOME_MODAL");
    },

    resetDuration() {
      this.formData.duration = 1;
    },

    courseForm1Error() {
      if (this.formErrors.length != 0) {
        if (
          this.formErrors.name ||
          this.formErrors.description ||
          this.formErrors.release
        ) {
          return false;
        }
      }
      return true;
    },

    courseForm2Error() {
      if (this.formErrors.length != 0) {
        if (
          this.formErrors["teachers.0.coordination.teacher_id"] ||
          this.formErrors["teachers.0.coordination.start_date"] ||
          this.formErrors["teachers.0.coordination.end_date"]
        ) {
          return false;
        }
      }
      return true;
    },

    courseForm3Error() {
      if (this.formErrors.length != 0) {
        if (this.formErrors.requirement) return false;
      }
      return true;
    },

    closeAttrModelAndContinue(scope) {
      this.manage_disciplines_dialog = false;
      this.nextStep(scope);
    },

    nextStep(scope) {
      this.noAttribution = false;
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          if (this.step == 2 && this.formData.disciplines.length == 0) {
            this.noAttribution = true;
            return;
          }
          this.step++;
        }
      });
    },

    prevStep: function() {
      this.step--;
    },

    onCourseCoverUpload() {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.tempCourseCover);
      fileReader.onload = ev => {
        this.formData.cover = ev.target.result;
      };
    },

    addCourse(add_new, scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.add(
            add_new,
            "courses",
            this.$props.formData,
            "APP_UPDATE_ALL_COURSES_DATA",
            "",
            true,
            "list_courses"
          );
        }
      });
    },

    updateCourse() {
      this.update(
        "courses/" + this.$props.formData.slug,
        this.$props.formData,
        "APP_UPDATE_ALL_COURSES_DATA",
        true,
        "list_courses"
      );
    }
  },
  components: {
    AddOutcome
  }
};
</script>