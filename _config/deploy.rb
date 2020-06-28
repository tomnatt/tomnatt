require 'mina/bundler'
require 'mina/rails'
require 'mina/git'

set :user, ENV['HOSTING_USER']
set :deploy_to, ENV['TOMNATT_HOSTING_DIR']
set :audio_source, ENV['TOMNATT_SYNC_HOME']
set :domain, 'tomnatt.com'
set :repository, 'git@github.com:tomnatt/tomnatt.git'
set :branch, 'master'

set :shared_paths, ['audio']

task :setup do
  command 'echo "-----> Create shared paths"'
  shared_directories = fetch(:shared_dirs, []).map do |file|
    # this is a path if no extension
    # otherwise, we need to lose the filename
    path = "#{fetch(:current_path)}/#{file}"
    if File.extname(path).empty?
      path
    else
      File.dirname(path)
    end
  end.uniq

  shared_directories.map do |dir|
    command echo_cmd "mkdir -p #{dir}"
    command echo_cmd "chmod g+rx,u+rwx #{dir}"
  end
end

desc 'Deploys the current version to the server.'
task :deploy do
  # sync the audio to the server
  # invoke :audio

  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    # cleanup
    invoke :'deploy:cleanup'
  end

  # build
  invoke :jekyll
end

desc 'Syncs the audio with the server'
task :audio do
  path = "#{fetch(:deploy_to)}/#{fetch(:shared_path)}"

  system "rsync -az -e ssh #{fetch(:audio_source)}/audio/ #{fetch(:user)}@#{fetch(:domain)}:#{path}/audio/"
end

desc 'Rebuild site'
task :jekyll do
  command "cd #{fetch(:deploy_to)}/current"
  command 'bundle exec rake'
end
