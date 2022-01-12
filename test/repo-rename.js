var should = require('chai').should(),
renameRepo = require('../repo-rename')


describe('#Rename', function() {
it('gets ID from repository', function() {
renameRepo.getRepoID("ULL-ESIT-DMSI-1920", "prueba-antonella-funciona").should.equal('R_kgDOGbeYPw\n');
});
it('converts old name into new name', function() {
  renameRepo.renameRepo("R_kgDOGbeYPw", "prueba-antonella-funciona1").should.equal("prueba-antonella-funciona1");
  });
});