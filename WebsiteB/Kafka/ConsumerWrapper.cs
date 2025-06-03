using Confluent.Kafka;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Text.Json;
using WebsiteB.Controllers;
using WebsiteB.Data;
using WebsiteB.Dto;
using WebsiteB.Models;
using WebsiteB.RepositoryInterface;

namespace WebsiteB.Kafka
{
    public class ConsumerWrapper : IConsumerWrapper
    {
        private readonly ConsumerConfig _config;
        private readonly IEntryRepository _entryRepository;

        public ConsumerWrapper(IOptions<ConsumerConfig> config, IEntryRepository repo)
        {
            _config = config.Value;
            _entryRepository = repo;
        }
        public void Consume(string topic)
        {
            var builder = new ConsumerBuilder<string, string>(_config)
                .SetKeyDeserializer(Deserializers.Utf8)
                .SetValueDeserializer(Deserializers.Utf8)
                .Build();

                builder.Subscribe(topic);
                var consumer = builder.Consume();
                Console.WriteLine($"Consumed message '{consumer.Value}'");
                var entry = JsonConvert.DeserializeObject<UpdateEntryDto>(consumer.Message.Value);
                Console.WriteLine($"Consumed message '{entry}'");
                Console.WriteLine(consumer.Message.Value);
                
                _entryRepository.EditEntry(entry);
                builder.Commit(consumer);
                
        }
    }
}
