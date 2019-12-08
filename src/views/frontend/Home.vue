<template>
  <div>
    <section>
      <app-slider></app-slider>
    </section>

    <section>
      <app-missions></app-missions>
    </section>

    <!-- <section>
      <app-parralax></app-parralax>
    </section> -->
     <section class="grey lighten-4">
      <app-team></app-team>
    </section>

    <section>
      <app-featured-formations></app-featured-formations>
    </section>

    <section>
      <app-contacts></app-contacts>
    </section>
  </div>
</template>

<script>
import AppSlider from "@/components/frontend/partials/AppSlider";
import AppMissions from "@/components/frontend/partials/AppMissions";
import AppParralax from "@/components/frontend/partials/AppParralax";
import AppTeam from "@/components/frontend/partials/AppTeam";
import AppFeaturedFormations from "@/components/frontend/partials/AppFeaturedFormations";
import AppContacts from "@/components/frontend/partials/AppContacts";

export default {
  components: {
    AppSlider,
    AppMissions,
    AppParralax,
    AppTeam,
    AppFeaturedFormations,
    AppContacts
  },
};
</script>