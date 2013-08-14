find ../source -name "*.*" -print0 | xargs -I % -0 ln -Fs ".."/% ../generated-prototype/__axhoox/

