module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		wiredep: {
			tasks: {
				src: 'public/index.html'
			}
		},
		sass: {
    		dist: {
      			files: {
       				'public/css/main.css': 'sass/main.sass'
      			},
      			options: {
      				outputStyle: 'compressed'
      			}
    		}
  		},
  		minified: {
			js: {
				src: 'js/*.js',
				dest: 'public/js/'
			},
  			options: {
  				sourcemap: false,
			    allinone: false,
			    ext: '.min.js'
  			}
  		},
  		cssmin: {
			target: {
		    	files: [{
		      		expand: true,
		      		cwd: 'css/',
		      		src: ['*.css', '!*.min.css'],
		      		dest: 'public/css/',
		      		ext: '.min.css'
		    	}]
		  	}
		},
		watch: {
			css: {
				files: '**/*.sass',
				tasks: ['sass']
			},
			js: {
				files: "js/*.js", 
				tasks: ["minified"],
				options: {
					livereload: true
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-minified');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('styles', ['sass', 'minified', 'watch']);
}