export const multFormData = {

    data() { return { repeatedContact: false, }; },

    methods: {
        addFormData(index, obj, objEl) { obj.push(objEl); },

        removeFormData(index, obj) { obj.splice(index, 1); },

        canAddContact(k) {
            if (
                this.formData.contacts[k].contact == "" ||
                this.formData.contacts[k].description == ""
            ) {
                return true;
            }
            return false;
        }, 



        findRepeatedContact(contact, pos) {
            this.repeatedContact = false;
            for (var i = 0; i < this.formData.contacts.length - 1; i++) {
                if (this.formData.contacts[i].contact == contact && i != pos) {
                    this.repeatedContact = true;
                    return;
                }
            }
            this.repeatedContact = false;
            return;
        },

        moreContact(index) {
            this.addFormData(index, this.formData.contacts, {
                type: "1",
                contact: "",
                description: ""
            });
        },

        removeContact(index) { this.removeFormData(index, this.formData.contacts); },

    },
}