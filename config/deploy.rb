require 'bundler/vlad'

set :application, "reinfo"
set :repository, "git@github.com:Michael-Gannon/reinfo.git"
set :user, 'mikgan'
set :deploy_to, "/tmp/#{application}"
set :scm, 'git'
set :domain, 'mikgan.com'
set :skip_scm, false

namespace :vlad do
  task :deploy => [:update]
end
