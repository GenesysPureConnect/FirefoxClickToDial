
task :default do
  if !Dir.exists?( "bin")
    Dir.mkdir "bin"
  end

  Dir.chdir('plugin') do
    sh 'cfx xpi'
    FileUtils.cp_r 'ininclicktodial.xpi', '../bin'
  end
end

task :run do
  Dir.chdir('plugin') do
    sh 'cfx run'
  end

end
