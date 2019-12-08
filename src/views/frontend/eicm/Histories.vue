<template>
  <v-container grid-list-xs>
    <v-row wrap>
      <v-col>
        <v-card tile>
          <v-card-title primary-title>EICM - GDC: História <v-spacer></v-spacer><v-btn color="grey" icon><v-icon>mdi-share</v-icon></v-btn></v-card-title>
          <v-card-text>
            <p class="text-justify">Voluptate eu nostrud ullamco nulla et dolor nulla ullamco voluptate excepteur velit. Ut et sit in incididunt excepteur exercitation in. Laboris officia occaecat et culpa qui aliqua sint duis exercitation do. Lorem sint dolor id fugiat amet cupidatat sint laborum sint nisi culpa consectetur dolor.</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card tile>
          <v-card-title primary-title>Principais Marcos Históricos<v-spacer></v-spacer><v-btn color="grey" icon><v-icon>mdi-share</v-icon></v-btn></v-card-title>
          <v-card-text>
            <v-timeline>
              <!-- <v-timeline-item v-for="(history, i) in histories" :key="i" small>
            <span
              slot="opposite"
              :class="`headline font-weight-bold`"
              v-text="formattingPresentDate(history.start_date)"
            ></span>
            <div class="py-3">
              <h2 :class="`headline font-weight-light mb-3`">{{history.title}}</h2>
              <div class="text-justify">{{history.content}}</div>
            </div>
              </v-timeline-item>-->

              <v-timeline-item small>
                <span slot="opposite" :class="`headline font-weight-bold`">10-10-1990</span>
                <div class="py-3">
                  <h2 :class="`headline font-weight-light mb-3`">Mudança de direção</h2>
                  <div class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt modi, facere provident eaque expedita reiciendis quia, facilis officiis omnis quibusdam nulla nam soluta accusantium. Placeat, asperiores? Qui distinctio dolores praesentium!</div>
                </div>
              </v-timeline-item>

              <v-timeline-item small>
                <span slot="opposite" :class="`headline font-weight-bold`">10-10-1990</span>
                <div class="py-3">
                  <h2 :class="`headline font-weight-light mb-3`">Mudança de direção</h2>
                  <div class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt modi, facere provident eaque expedita reiciendis quia, facilis officiis omnis quibusdam nulla nam soluta accusantium. Placeat, asperiores? Qui distinctio dolores praesentium!</div>
                </div>
              </v-timeline-item>

              <v-timeline-item small>
                <span slot="opposite" :class="`headline font-weight-bold`">10-10-1990</span>
                <div class="py-3">
                  <h2 :class="`headline font-weight-light mb-3`">Mudança de direção</h2>
                  <div class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt modi, facere provident eaque expedita reiciendis quia, facilis officiis omnis quibusdam nulla nam soluta accusantium. Placeat, asperiores? Qui distinctio dolores praesentium!</div>
                </div>
              </v-timeline-item>

              <v-timeline-item small>
                <span slot="opposite" :class="`headline font-weight-bold`">10-10-1990</span>
                <div class="py-3">
                  <h2 :class="`headline font-weight-light mb-3`">Mudança de direção</h2>
                  <div class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt modi, facere provident eaque expedita reiciendis quia, facilis officiis omnis quibusdam nulla nam soluta accusantium. Placeat, asperiores? Qui distinctio dolores praesentium!</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>