# Generated by Django 4.0.3 on 2022-05-17 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('language', '0006_alter_language_genus_alter_language_lang_id_and_more'),
        ('solution', '0006_solution_failure_message_solution_victory_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='solution',
            name='hidden_options',
            field=models.ManyToManyField(blank=True, limit_choices_to={'hidden': True}, related_name='hidden_solutions', to='language.language'),
        ),
        migrations.AlterField(
            model_name='solution',
            name='alternates',
            field=models.ManyToManyField(blank=True, related_name='alternate_solutions', to='language.language'),
        ),
    ]
