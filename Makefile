all: build install pull

stack:
	npm run-script build
	@docker build --tag=anthonyrawlinsuom/lfmc-staging .
	@docker push anthonyrawlinsuom/lfmc-staging

build:
	npm run-script build
	@docker build --tag=anthonyrawlinsuom/lfmc-staging .

install:
	@docker push anthonyrawlinsuom/lfmc-staging
	
pull:
	@docker pull anthonyrawlinsuom/lfmc-staging

patch:
	./patch.sh

release:
	./release.sh

clean:
	@docker rmi --force anthonyrawlinsuom/lfmc-staging