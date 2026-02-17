<?php

namespace Tests\Feature;

use App\Models\Client;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login(): void
    {
        $this->get('/clients')->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_view_clients_index(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/clients')
            ->assertOk();
    }

    public function test_user_can_create_client_with_name(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/clients', [
                'nome' => 'Mario',
                'cognome' => 'Rossi',
                'email' => 'mario@esempio.it',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('clients', [
            'user_id' => $user->id,
            'nome' => 'Mario',
            'cognome' => 'Rossi',
            'email' => 'mario@esempio.it',
        ]);
    }

    public function test_user_can_create_client_with_ragione_sociale(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/clients', [
                'ragione_sociale' => 'Rossi S.r.l.',
                'partita_iva' => '01234567890',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('clients', [
            'user_id' => $user->id,
            'ragione_sociale' => 'Rossi S.r.l.',
            'partita_iva' => '01234567890',
        ]);
    }

    public function test_client_creation_requires_name_or_ragione_sociale(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/clients', [
                'email' => 'test@esempio.it',
            ])
            ->assertSessionHasErrors('nome');
    }

    public function test_client_creation_validates_email(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/clients', [
                'nome' => 'Mario',
                'email' => 'not-an-email',
            ])
            ->assertSessionHasErrors('email');
    }

    public function test_user_can_update_client(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->for($user)->create(['nome' => 'Mario']);

        $this->actingAs($user)
            ->patch("/clients/{$client->id}", [
                'nome' => 'Giuseppe',
                'cognome' => 'Verdi',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('clients', [
            'id' => $client->id,
            'nome' => 'Giuseppe',
            'cognome' => 'Verdi',
        ]);
    }

    public function test_user_cannot_update_another_users_client(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $client = Client::factory()->for($otherUser)->create();

        $this->actingAs($user)
            ->patch("/clients/{$client->id}", [
                'nome' => 'Hacked',
            ])
            ->assertForbidden();
    }

    public function test_user_can_delete_client(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->for($user)->create();

        $this->actingAs($user)
            ->delete("/clients/{$client->id}")
            ->assertRedirect('/clients');

        $this->assertSoftDeleted('clients', ['id' => $client->id]);
    }

    public function test_user_cannot_delete_another_users_client(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $client = Client::factory()->for($otherUser)->create();

        $this->actingAs($user)
            ->delete("/clients/{$client->id}")
            ->assertForbidden();
    }

    public function test_project_creation_requires_client_id(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/projects', [
                'name' => 'Test Project',
            ])
            ->assertSessionHasErrors('client_id');
    }

    public function test_project_can_be_created_with_client(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->for($user)->create();

        $this->actingAs($user)
            ->post('/projects', [
                'name' => 'Test Project',
                'client_id' => $client->id,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('projects', [
            'user_id' => $user->id,
            'name' => 'Test Project',
            'client_id' => $client->id,
        ]);
    }

    public function test_client_display_name_shows_ragione_sociale_when_available(): void
    {
        $client = Client::factory()->create([
            'nome' => 'Mario',
            'cognome' => 'Rossi',
            'ragione_sociale' => 'Rossi S.r.l.',
        ]);

        $this->assertEquals('Rossi S.r.l.', $client->display_name);
    }

    public function test_client_display_name_shows_nome_cognome_as_fallback(): void
    {
        $client = Client::factory()->create([
            'nome' => 'Mario',
            'cognome' => 'Rossi',
            'ragione_sociale' => null,
        ]);

        $this->assertEquals('Mario Rossi', $client->display_name);
    }

    public function test_client_full_address_formats_correctly(): void
    {
        $client = Client::factory()->create([
            'indirizzo_via' => 'Via Roma 123',
            'indirizzo_citta' => 'Palermo',
            'indirizzo_cap' => '90100',
            'indirizzo_provincia' => 'PA',
        ]);

        $this->assertEquals('Via Roma 123, 90100 Palermo, (PA)', $client->full_address);
    }
}
