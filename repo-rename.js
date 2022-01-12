const shell = require('shelljs');

/**
 * gets repo ID
 * @param {string} owner 
 * @param {string} name 
 * @returns ID
 */
function getRepoID(owner, name) {
  const queryRepoID = (owner, name) => `
    query getrepoID{
        repository(owner: "${owner}", name: "${name}"){
          id
        }
      }
    `;
    let r = shell.exec(`gh api graphql -f query='${queryRepoID(owner, name)}' --jq '.data.repository.id'`, 
    {silent: true}
    );

    if (r.code !== 0) {
      console.error(r.stderr)
      process.exit(r.code)
    }
    const ID = r.stdout
    return ID;
}

/**
 * Renames repository
 * @param {ID} ID 
 * @param {string} newName 
 * @returns string
 */
function renameRepo (ID, newName) {
  const queryRenameRepo = (id, newName) => `   
    mutation renameRepo{
      updateRepository(input: 
        {
          name: "${newName}"
          repositoryId: "${id}"
        }
      ) {
        repository{
          name
        }
      }
    }
  `;

  r = shell.exec(`gh api graphql -f query='${queryRenameRepo(ID, newName)}' --jq '.data.updateRepository.repository.name'` , 
    {silent: true}
  );

  if (r.code !== 0) {
    console.error(r.stderr)
    process.exit(r.code)
  }
  return r.stdout.replace(/\s+$/,'');
}

module.exports = {
  getRepoID,
  renameRepo
}