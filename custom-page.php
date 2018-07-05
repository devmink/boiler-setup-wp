<?php
/*
 * Template Name: Your Custom Page
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
Timber::render( 'your-custom-page.twig', $context );