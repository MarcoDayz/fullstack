DROP TABLE goals;

CREATE TABLE goals(
    id serial,
    first_name text,
    last_name text,
    goal_descr text,
    complete boolean
);

INSERT INTO goals(first_name,last_name,goal_descr,complete) VALUES('marco','diaz','Graduate MCSP-14', 'true');