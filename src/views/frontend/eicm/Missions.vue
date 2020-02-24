<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-card flat>
        <v-card-text class="ma-0 pa-0">
          <template v-for="(mission, m) in missions">
            <div :key="'mission_'+m">
              <v-card flat>
                <v-card-title primary-title>
                  <h3 class="headline primary--text">{{mission.name}}</h3>
                </v-card-title>
                <v-card-text>
                  <p class="text-justify">{{mission.content}}</p>
                </v-card-text>
              </v-card>
              <v-divider v-if="m != missions.length-1"></v-divider>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      missions: [
        {
          id: 1,
          name: "Missão",
          content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates asperiores eius odit sequi a adipisci commodi cupiditate doloremque obcaecati iure, maxime eveniet accusamus ipsa possimus reiciendis. Ut praesentium rerum dolore ad ea laudantium officiis recusandae veniam ipsum eum deserunt deleniti, natus quam delectus suscipit consequuntur facilis blanditiis molestias asperiores eligendi odit? Magni nisi odio optio error ratione ad dolore, saepe iure cum eveniet nesciunt autem adipisci eaque molestias odit delectus hic repellat deleniti natus modi veritatis!"
        },
        {
          id: 2,
          name: "Visão",
          content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates asperiores eius odit sequi a adipisci commodi cupiditate doloremque obcaecati iure, maxime eveniet accusamus ipsa possimus reiciendis. Ut praesentium rerum dolore ad ea laudantium officiis recusandae veniam ipsum eum deserunt deleniti, natus quam delectus suscipit consequuntur facilis blanditiis molestias asperiores eligendi odit? Magni nisi odio optio error ratione ad dolore, saepe iure cum eveniet nesciunt autem adipisci eaque molestias odit delectus hic repellat deleniti natus modi veritatis!"
        },
        {
          id: 3,
          name: "Valores",
          content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates asperiores eius odit sequi a adipisci commodi cupiditate doloremque obcaecati iure, maxime eveniet accusamus ipsa possimus reiciendis. Ut praesentium rerum dolore ad ea laudantium officiis recusandae veniam ipsum eum deserunt deleniti, natus quam delectus suscipit consequuntur facilis blanditiis molestias asperiores eligendi odit? Magni nisi odio optio error ratione ad dolore, saepe iure cum eveniet nesciunt autem adipisci eaque molestias odit delectus hic repellat deleniti natus modi veritatis!"
        }
      ]
    };
  }
};
</script>