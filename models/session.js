var Session = {
    id: null,
    getId: function() {
        if (this.id === null) {
            var newId = sessionStorage.getItem('tanksSession');
            if (!newId) {
                newId = Math.random().toString(36).slice(2);
                sessionStorage.setItem('tanksSession', newId);
            }
            this.id = newId;
        }

        return this.id;
    }
};