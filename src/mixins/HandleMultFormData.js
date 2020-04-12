export const multFormData = {

    data() {
        return {
            repeatedPhone: false,
            repeatedEmail: false,
        };
    },

    methods: {
        addFormData(index, obj, objEl) {
            obj.push(objEl);
        },

        removeFormData(index, obj) {
            obj.splice(index, 1);
        },

        canAddPhone(k) {
            if (
                this.formData.phones[k].number == "" ||
                this.formData.phones[k].description == ""
            ) {
                return true;
            }
            return false;
        },

        canAddEmail(k) {
            if (
                this.formData.emails[k].email == "" ||
                this.formData.emails[k].description == ""
            ) {
                return true;
            }
            return false;
        },

        findRepeatedPhone(number) {
            this.repeatedPhone = false;
            for (var i = 0; i < this.formData.phones.length - 1; i++) {
                if (this.formData.phones[i].number == number) {
                    this.repeatedPhone = true;
                    return;
                }
            }
            this.repeatedPhone = false;
            return;
        },

        findRepeatedEmail(email) {
            this.repeatedEmail = false;
            for (var i = 0; i < this.formData.emails.length - 1; i++) {
                if (this.formData.emails[i].email == email) {
                    this.repeatedEmail = true;
                    return;
                }
            }
            this.repeatedEmail = false;
            return;
        },

        morePhone(index) {
            this.findRepeatedPhone(this.formData.phones[index].number)
            if (!this.repeatedPhone) {
                this.addFormData(index, this.formData.phones, {
                    number: "",
                    description: ""
                });
            }
        },

        moreEmail(index) {
            this.findRepeatedEmail(this.formData.emails[index].email)
            if (!this.repeatedEmail) {
                this.addFormData(index, this.formData.emails, {
                    email: "",
                    description: ""
                });
            }
        },

        removePhone(index) {
            this.removeFormData(index, this.formData.phones);
        },

        removeEmail(index) {
            this.removeFormData(index, this.formData.emails);
        },


    },
}