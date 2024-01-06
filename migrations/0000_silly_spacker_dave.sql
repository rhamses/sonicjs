CREATE TABLE `options` (
	`id` text PRIMARY KEY NOT NULL,
	`option_name` text,
	`option_value` text,
	`autoload` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `postmeta` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`meta_key` text,
	`meta_value` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`post_author` text NOT NULL,
	`post_content` text,
	`post_title` text,
	`post_slug` text,
	`post_excerpt` text,
	`post_status` text,
	`post_type` text,
	`guid` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`post_author`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reltermpost` (
	`id` text PRIMARY KEY NOT NULL,
	`term_id` integer NOT NULL,
	`post_id` integer NOT NULL,
	`term_order` integer,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`term_id`) REFERENCES `terms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `taxonomy` (
	`id` text PRIMARY KEY NOT NULL,
	`term_id` integer NOT NULL,
	`taxonomy` text,
	`description` text,
	`parent` text,
	`count` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`term_id`) REFERENCES `terms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `termmeta` (
	`id` text PRIMARY KEY NOT NULL,
	`term_id` integer NOT NULL,
	`meta_key` text,
	`meta_value` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`term_id`) REFERENCES `terms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `terms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`slug` text,
	`term_group` integer,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`term_group`) REFERENCES `terms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `usermeta` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`meta_key` text,
	`meta_value` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`user_login` text,
	`user_pass` text,
	`user_nicename` text,
	`user_email` text,
	`user_status` text,
	`createdOn` integer,
	`updatedOn` integer
);
