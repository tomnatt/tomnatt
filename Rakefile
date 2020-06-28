require 'jekyll'

task default: [:clean] do
  Jekyll::Commands::Build.process({ config: '_config/jekyll_config.yml' })
end

task :serve do
  Jekyll::Commands::Serve.process({ config: '_config/jekyll_config.yml', livereload: true })
end

task :clean do
  puts 'Cleaning up _site...'.bold
  Jekyll::Commands::Clean.process({ config: '_config/jekyll_config.yml' })
end
