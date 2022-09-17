file=".npmrc"
echo "registry=https://registry.npmjs.org/" > $file
echo "@autobid247:registry=https://npm.pkg.github.com" >> $file
echo "//npm.pkg.github.com/:_authToken=$1" >> $file
