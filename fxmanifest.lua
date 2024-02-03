fx_version 'cerulean'
games { 'rdr3', 'gta5' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

author 'm_imperfect'
description 'Support in-game Arabic entries.'
version '1.0.0'

font_face 'Arabic'
client_script 'src/font.lua'

shared_scripts {
  'src/utils.js',
  'src/directing.js',
  'src/linking.js',
  'src/relating.js',
  'src/exporting.js'
}

server_script 'examples/test.lua'
