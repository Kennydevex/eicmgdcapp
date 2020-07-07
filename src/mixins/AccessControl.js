// jshint esversion:6
import store from '../store';
export const acl = {
    data: () => ({ authUserPermissions: [], authUserRoles: [], }),

    computed: { authUser: function () { return store.state.auth.authUser; }, },

    created: function () {
        this.setUserPermissions();
        this.setUserRoles();
        this.setUserPermissionsByRoles();
        // this.setUserRolesByPermissions(); 
    },

    methods: {
        setUserPermissions() {
            let mthis = this;
            if (!this.authUser) { return; }
            this.authUser.permissions.forEach(function (permission) {
                mthis.authUserPermissions.push(permission.name);
            });
        },

        setUserPermissionsByRoles() {
            let mthis = this;
            if (!this.authUser) { return; }
            if (!this.authUser.roles) { return; }
            this.authUser.roles.forEach(function (role) {
                if (!role.permissions) { return; }
                role.permissions.forEach(function (permission) {
                    if (mthis.authUserPermissions.indexOf(permission.name) === -1) {
                        mthis.authUserPermissions.push(permission.name);
                    }
                });
            });
        },

        setUserRoles() {
            let mthis = this;
            if (!this.authUser) { return; }
            this.authUser.roles.forEach(function (role) {
                mthis.authUserRoles.push(role.name);
            });
        },

        setUserRolesByPermissions() {
            let mthis = this;
            if (!this.authUser) { return; }
            if (!this.authUser.permissions) { return; }
            this.authUser.permissions.forEach(function (permission) {
                if (!permission.roles) { return; }
                permission.roles.forEach(function (role) {
                    if (mthis.authUserRoles.indexOf(role.name) === -1) {
                        mthis.authUserRoles.push(role.name);
                    }
                });
            });
        },

        canManage() {
            return this.authUserPermissions.indexOf('Gerir') !== -1;
        },

        canManageSchool() {
            return this.authUserPermissions.indexOf('Gerir Escola') !== -1;
        },

        _can(permission) {
            if (this.canManage() || this.isAdmin()) { return true; }
            // if (this.canManage()) { return true; }
            return this.authUserPermissions.indexOf(permission) !== -1;
        },


        canAdd() {
            return this._can('Adicionar');
        },

        canEdit() {
            return this._can('Editar');
        },

        canRemove() {
            return this._can('Eliminar');
        },

        canActive() {
            return this._can('Ativar');
        },

        canPublish() {
            return this._can('Publicar');
        },


        isAdmin() {
            return this.authUserRoles.indexOf('Administrador') !== -1;
            // return true;
        },

        _is(role) {
            if (this.isAdmin()) { return true; }
            return this.authUserRoles.indexOf(role) !== -1;
        },

        isDirector() {
            return this._is('Gestor');
        },

        isManager() {
            return this._is('Gestor de Artigo');
        },


        isPostManager() {
            return this._is('Gestor de Artigo');
        },

        isCoordinator() {
            return this._is('Coordenador');
        },
    },
};
