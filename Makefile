all: build

build:
	npm run-script build
	@docker build --tag=anthonyrawlinsuom/lfmc-staging .

install:
	@docker push anthonyrawlinsuom/lfmc-staging

clean:
	@docker rmi anthonyrawlinsuom/lfmc-staging