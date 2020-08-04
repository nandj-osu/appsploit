/* Reset user1's tasks*/
DELETE FROM "main"."todo" WHERE "user_id" = '1';
INSERT INTO "main"."todo" ("task_description", "task_complete", "user_id") VALUES ('Injection', '0', '1');
INSERT INTO "main"."todo" ("task_description", "task_complete", "user_id") VALUES ('Sensitive data exposure', '0', '1');
INSERT INTO "main"."todo" ("task_description", "task_complete", "user_id") VALUES ('XML external entities (XXE)', '0', '1');
INSERT INTO "main"."todo" ("task_description", "task_complete", "user_id") VALUES ('Broken access control', '0', '1');
INSERT INTO "main"."todo" ("task_description", "task_complete", "user_id") VALUES ('Security misconfiguration', '0', '1');
INSERT INTO "main"."todo" ("task_description", "task_complete", "user_id") VALUES ('Cross-site scripting (XSS)', '0', '1');
INSERT INTO "main"."todo" ("task_description", "task_complete", "user_id") VALUES ('Insecure deserialization', '0', '1');
INSERT INTO "main"."todo" ("task_description", "task_complete", "user_id") VALUES ('Using components with known vulnerabilities', '0', '1');
INSERT INTO "main"."todo" ("task_description", "task_complete", "user_id") VALUES ('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '0', '1');
INSERT INTO "main"."todo" ("task_description", "task_complete", "user_id") VALUES ('Insufficient logging & monitoring', '0', '1');