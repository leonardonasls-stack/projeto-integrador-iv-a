export const GithubService = {
  async importRepository(repoUrl: string) {
    try {
      const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) {
        throw new Error('URL do GitHub inválida. Use o formato: https://github.com/usuario/repositorio');
      }

      const [, owner, repo] = match;
      const cleanRepo = repo.replace(/\.git$/, '');

      const response = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`);
      
      if (!response.ok) {
        if (response.status === 404) throw new Error('Repositório não encontrado (ou é privado).');
        if (response.status === 403) throw new Error('Limite de requisições da API do GitHub atingido.');
        throw new Error('Falha ao comunicar com a API do GitHub.');
      }

      const data = await response.json();

      const techs = [];
      if (data.language) techs.push(data.language);
      if (data.topics && Array.isArray(data.topics)) {
        // Pega até 4 tópicos relevantes
        techs.push(...data.topics.slice(0, 4));
      }

      return {
        title: data.name,
        description: data.description || '',
        githubUrl: data.html_url,
        demoUrl: data.homepage || '',
        techs: techs.length > 0 ? techs : ['GitHub']
      };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao importar repositório.');
    }
  }
};
