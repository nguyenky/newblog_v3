angular.module('app')
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: [
                {
                    name: 'uiboostrap',
                    files: [
                        'resources/assets/storage/angular-ui-bootstrap/ui-bootstrap-tpls.js',
                    ]
                },
                {
                    name: 'cropimage',
                    files: [
                        'resources/assets/storage/ng-file-upload/ng-file-upload.js',
                        'resources/assets/storage/ng-file-upload/ng-img-crop.js',
                    ]
                },
                {
                    name: 'toastr',
                    files: [
                        'resources/assets/storage/angular-toastr/angular-toastr.css',
                        'resources/assets/storage/angular-toastr/angular-toastr.tpls.js',

                    ]
                },
                {
                    name: 'paginate',
                    files: [
                        'resources/assets/storage/angular-utils-pagination/dirPagination.js',
                    ]
                },
                {
                    name: 'treeview',
                    files: [
                        'resources/assets/storage/angular-treeview/tree-control-attribute.css',
                        'resources/assets/storage/angular-treeview/tree-control.css',
                        'resources/assets/storage/angular-treeview/angular-tree-control.js',
                    ]
                },
                {
                    name: 'select',
                    files: [
                        'resources/assets/storage/angular-sanitize/angular-sanitize.js',
                        'resources/assets/storage/ui-select/select.min.css',
                        'resources/assets/storage/ui-select/select.min.js',
                    ]
                },
                {
                    name: 'dropzone',
                    files: [
                        // 'resources/assets/dropzone/dropzone.css',
                        'resources/assets/storage/ngdropzone/ng-dropzone.min.js',
                        'resources/assets/storage/ngdropzone/ng-dropzone.min.css',


                    ]
                },
                {
                    name: 'summernote',
                    files: [
                        'resources/assets/storage/angular-summernote/summernote.css',
                        'resources/assets/storage/angular-summernote/summernote.min.js',
                        'resources/assets/storage/angular-summernote/angular-summernote.min.js',
                    ]
                },
                {
                    name: 'sanitize',
                    files: [
                        'resources/assets/storage/angular-sanitize/angular-sanitize.js',
                    ]
                }
            ]
        });
    }]);