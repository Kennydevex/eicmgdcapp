<template>
  <v-container grid-list-xs>
    <v-row wrap>
      <v-col class="py-0">
        <v-card flat>
          <v-card-title primary-title>
            <h4 class="font-weight-regular primary--text" v-text="histories[0].title"></h4>
            <v-spacer></v-spacer>
            <v-btn color="grey" icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p class="text-justify body-1">{{histories[0].content}}</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" class="py-0">
        <v-card flat>
          <v-card-title primary-title>
            <h4 class="font-weight-regular primary--text">Marcos Históricos</h4>
            <v-spacer></v-spacer>
            <v-btn color="grey" icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-timeline>
              <template v-for="(mark, m) in marks">
                <v-timeline-item small :key="'front_mark_'+m">
                  <span
                    slot="opposite"
                    :class="`subtitle-1 font-weight-bold`"
                    class="primary--text"
                  >{{displayDayAndMonth(mark.begin)}} <v-icon>mdi-arrow-right-bold</v-icon> {{displayDayAndMonth(mark.end)}}</span>
                  <div class="py-3">
                    <h2 :class="`headline font-weight-regular mb-3`">{{mark.title}}</h2>
                    <div class="text-justify">{{mark.description}}</div>
                  </div>
                </v-timeline-item>
              </template>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import { getDatas } from "@/mixins/SendForm";
import {dateFormat} from '@/mixins/DateTime'
export default {
  mixins: [getDatas, dateFormat],
  data() {
    return {
      history: {
        id: 1,
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates asperiores eius odit sequi a adipisci commodi cupiditate doloremque obcaecati iure, maxime eveniet accusamus ipsa possimus reiciendis. Ut praesentium rerum dolore ad ea laudantium officiis recusandae veniam ipsum eum deserunt deleniti, natus quam delectus suscipit consequuntur facilis blanditiis molestias asperiores eligendi odit? Magni nisi odio optio error ratione ad dolore, saepe iure cum eveniet nesciunt autem adipisci eaque molestias odit delectus hic repellat deleniti natus modi veritatis! Iusto nam eveniet, soluta esse inventore amet sint eligendi nobis voluptatem at veritatis ea recusandae libero.",
        marks: [
          {
            id: 1,
            begin: "10/1990",
            end: "10/2000",
            title: "Mudanca de direcao",
            description:
              "Officia et at quae, aliquid enim nam harum ducimus mollitia voluptas autem tempora doloribus odit laborum consequuntur eum laboriosam exercitationem saepe, quo numquam! Ut nulla, dolore consequuntur laboriosam, praesentium molestias numquam eaque voluptatibus maxime quisquam, ullam illum. Quo deleniti a, labore velit ad maxime qui voluptate, tempora iusto sequi rem!"
          },

          {
            id: 2,
            begin: "10/1990",
            end: "10/2000",
            title: "Mudanca de direcao",
            description:
              "Officia et at quae, aliquid enim nam harum ducimus mollitia voluptas autem tempora doloribus odit laborum consequuntur eum laboriosam exercitationem saepe, quo numquam! Ut nulla, dolore consequuntur laboriosam, praesentium molestias numquam eaque voluptatibus maxime quisquam, ullam illum. Quo deleniti a, labore velit ad maxime qui voluptate, tempora iusto sequi rem!"
          }
        ]
      }
    };
  },

  created() {
    this.getAll(this.histories, "getHistories");
    this.getAll(this.marks, "getMarks");
  },

  computed: {
    histories() {
      return this.$store.getters.histories;
    },
    marks() {
      return this.$store.getters.marks;
    }
  }
};
</script>