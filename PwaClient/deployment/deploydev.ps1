# Update version
$version = npm version patch

# Create git tag and push it
$message = "UI v" + $version
git tag -a $version -m $message
git push --tags

# Generate static web site
npm run generate:prod

# Compress dist folder and copy all files to dist-zip
$account = "runningonmapdev"
$key = $Env:RUNONMAP_DEPLOYMENT_STORAGE_KEY
az storage blob upload-batch --account-name $account --account-key $key -s ./dist -d '$web' --type block
